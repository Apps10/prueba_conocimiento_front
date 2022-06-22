import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/Services/backend.service';
import { EmailEmpleadoI,EmpleadoI,TelefonoEmpleadoI } from "../../Interfaces/empleado";
import Swal from "../../Helpers/sweet-alert";


@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.css']
})
export class EditEmpleadoComponent implements OnInit {
  EmpleadoForm:FormGroup;
  TelefonoForm:FormGroup;
  EmailForm:FormGroup;
  SubmittedEmp=false;
  SubmittedE=false;
  SubmittedT=false;


  emails:Array<EmailEmpleadoI> = [];
  telefonos:Array<TelefonoEmpleadoI> = [];
  empleado_id="";
  empleado:any = [];

  constructor(
    private fb:FormBuilder,
    private routeActive:ActivatedRoute,
    private api:BackendService
  ) {
    this.empleado_id = this.routeActive.snapshot.paramMap.get("id")!;
    this.EmpleadoForm = this.fb.group({
      nombres:["",[Validators.required,Validators.maxLength(255)]],
      apellidos:["",[Validators.required,Validators.maxLength(255)]],
      tipoIdentificacion:["",[Validators.required,this.TipoDocumentValidator]],
      identificacion:["",[Validators.required,Validators.maxLength(20)]]
    });

    this.TelefonoForm = this.fb.group({
      Tipo:["",[Validators.required]],
      numero:["",[Validators.required,Validators.maxLength(20),Validators.pattern("^[0-9]+")]],
      indicativo:["",[Validators.required,Validators.maxLength(10)]]
    });

    this.EmailForm = this.fb.group({
      email:["",[Validators.required,Validators.email,Validators.maxLength(255)]]
    });

  }

  ngOnInit(): void {
    this.api.GetEmpleadoById(this.empleado_id).subscribe((res:any)=>{
      if(!res.ok){
        return Swal.Error('Error al Consultar El Empleado',res.body);
      }
      const {
        nombres,
        apellidos,
        tipoIdentificacion,
        identificacion
      }:EmpleadoI = res.body;

      this.EmpleadoForm.controls['nombres'].setValue(nombres);
      this.EmpleadoForm.controls['apellidos'].setValue(apellidos);
      this.EmpleadoForm.controls['identificacion'].setValue(identificacion);
      this.EmpleadoForm.controls['tipoIdentificacion'].setValue(tipoIdentificacion);
      return "";
    });
    this.getTel(this.empleado_id);
    this.getEmail(Number(this.empleado_id));
  }

  UpdateEmpleado(){
    this.SubmittedEmp=true;
    if(this.EmpleadoForm.invalid){
      return Swal.Error('Error al Actualizar Empleado',"Tienes algunos Errores En el Formulario");
    }
    this.SubmittedE=false;

    const { apellidos,identificacion,nombres,tipoIdentificacion }:EmpleadoI = this.EmpleadoForm.value;
    return this.api.UpdateEmpleado(Number(this.empleado_id),{ apellidos,identificacion,nombres,tipoIdentificacion }).subscribe((res:any)=>{
      if(!res.ok){
        return Swal.Error("Error Al Crear El Email",res.body);
      }
      console.log(res.body);
      Swal.Success("Correcto",res.body);
      return this.getEmail(Number(this.empleado_id));
    },(err)=>{
      return Swal.Error("Error Al Crear El Email",err.error.body);
    })
  }

  getErrorEmpleado(control:string,error:string){
    return this.EmpleadoForm.get(control)?.hasError(error);
  }

  limpiar_empleado(){
    this.EmpleadoForm.controls['nombres'].setValue("");
    this.EmpleadoForm.controls['apellidos'].setValue("");
    this.EmpleadoForm.controls['identificacion'].setValue("");
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

  newEmail(){
    this.SubmittedE=true;
    if(this.EmailForm.invalid){
      return Swal.Error('Error al Crear Email',"Tienes algunos Errores En el Formulario");
    }
    this.SubmittedE=false;

    const { email }:EmailEmpleadoI = this.EmailForm.value;
    return this.api.NewEmail({ email,personaId:Number(this.empleado_id) }).subscribe((res:any)=>{
      if(!res.ok){
        return Swal.Error("Error Al Crear El Email",res.body);
      }
      Swal.Success("Correcto",res.body);
      return this.getEmail(Number(this.empleado_id));
    },(err)=>{
      return Swal.Error("Error Al Crear El Email",err.error.body);
    })
  }

  getEmail(id:number){
    this.api.GetEmails(id).subscribe((res:any)=>{
      if(!res.ok){
        Swal.Error("Error",res.body);
        return ;
      }
      this.emails=res.body;
    },(err)=>{
      return Swal.Error("Error",err.error.body);
    });
  }

  deleteEmail(id:number){
    this.api.DeleteEmail(id).subscribe((res:any)=>{
      if(!res.ok){
        return Swal.Error("Error al Eliminar El Email",res.body);
      }
      for(let i=0;i<this.emails.length;i++){
        if(this.emails[i].id==id){
          const telst = Array<EmailEmpleadoI>();
          this.emails.filter((tels:EmailEmpleadoI)=>{
            if(tels.id != id){
              telst.push(tels);
            }
          });
          this.emails=telst;
          break;
        }
      }
      Swal.Success('Correcto',res.body);
      return "";
    },(err)=>{
      return Swal.Error("Error",err.error.body);
    });
  }




  NewTel(){
    this.SubmittedT=true;
    if(this.TelefonoForm.invalid){
      console.log(this.TelefonoForm.value)
      return Swal.Error('Error al Crear Telefono',"Tienes algunos Errores En el Formulario");
    }

    this.SubmittedT=false;
    const { Tipo,numero,indicativo }:TelefonoEmpleadoI = this.TelefonoForm.value;
    return this.api.NewTelefono({ numero,indicativo,Tipo,personaId:Number(this.empleado_id) }).subscribe((res:any)=>{
      if(!res.ok){
        return Swal.Error("Error Al Crear El Telefono",res.body);
      }
      Swal.Success("Correcto",res.body);
      return this.getTel(this.empleado_id);
    },(err)=>{
      return Swal.Error("Error",err.error.body);
    })
  }

  deleteTel(id:number){
    this.api.DeleteTelefono(id).subscribe((res:any)=>{
      if(!res.ok){
        return Swal.Error("Error al Eliminar El Telefono",res.body);
      }
      for(let i=0;i<this.telefonos.length;i++){
        if(this.telefonos[i].id==id){
          const telst = Array<TelefonoEmpleadoI>();
          this.telefonos.filter((tels:TelefonoEmpleadoI)=>{
            if(tels.id != id){
              telst.push(tels);
            }
          });
          this.telefonos=telst;
          break;
        }
      }
      Swal.Success('Correcto',res.body);
      return "";
    },(err)=>{
      return Swal.Error("Error",err.error.body);
    });
  }

  getTel(id:string){
    this.api.GetTelefonos(id).subscribe((res:any)=>{
      if(!res.ok){
        Swal.Error("Error",res.body);
        return ;
      }
      this.telefonos=res.body;
    },(err)=>{
      return Swal.Error("Error",err.error.body);
    });
  }





}
