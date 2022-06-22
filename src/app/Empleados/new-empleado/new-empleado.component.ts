import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { EmpleadoI } from 'src/app/Interfaces/empleado';
import { BackendService } from 'src/app/Services/backend.service';
import Swal from "../../Helpers/sweet-alert";


@Component({
  selector: 'app-new-empleado',
  templateUrl: './new-empleado.component.html',
  styleUrls: ['./new-empleado.component.css']
})
export class NewEmpleadoComponent implements OnInit {
  public createEmpleado:FormGroup;
  errors:Array<string> = [];
  Submitted = false;

  constructor(
    private api:BackendService,
    private fb:FormBuilder
  ) {
    this.createEmpleado = this.fb.group({
      nombres:["",[Validators.required,Validators.maxLength(255)]],
      apellidos:["",[Validators.required,Validators.maxLength(255)]],
      tipoIdentificacion:["",[Validators.required,this.TipoDocumentValidator]],
      identificacion:["",[Validators.required,Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
  }


  getError(campo:string,error:string){
    return this.createEmpleado.get(campo)?.hasError(error);
  }

  newEmpleado(){
    this.Submitted = true;
    if(this.createEmpleado.invalid){
      return Swal.Error('Error',"Existen Algunos Problemas En El Formulario");
    }
    const {nombres,apellidos,identificacion,tipoIdentificacion}:EmpleadoI = this.createEmpleado.value;
    this.Submitted=false;
    return this.api.newEmpleado({nombres,apellidos,identificacion,tipoIdentificacion}).subscribe((res:any)=>{
      if(!res.ok){
        return Swal.Error('Error Al Crear Empleado',res.body);
      }
      this.limpiar();
      return Swal.Success('Correcto',res.body);
    },(err)=>{
      return Swal.Error('Error Al Crear Empleado', err.error.body);
    });
  }

  limpiar(){
    this.createEmpleado.controls['nombres'].setValue("");
    this.createEmpleado.controls['apellidos'].setValue("");
    this.createEmpleado.controls['identificacion'].setValue("");
  }

  TipoDocumentValidator(control: FormControl) {
    let tipo = control.value;
    if(tipo != "nit" && tipo != "cc"){
      return {
          tipo_documento: "invalid"
      }
    }
    return null;
  }
}
