import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { EmpleadoI } from "../../Interfaces/empleado";
import Swal from "../../Helpers/sweet-alert";
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  empleados = Array<EmpleadoI>();
  constructor(private api:BackendService) { }

  ngOnInit(): void {
    this.loadEmpleados();
  }

  loadEmpleados(){
    console.log("entra en el load")
    this.api.GetEmpleadosAll()
    .subscribe((response:any) => {
      console.log("entra en el subscribe");
      console.log(response);
      if(!response.ok){
        Swal.Error("Error al Cargar Empleados",response.body);
        return ;
      }
      this.empleados=response.body;
    });
  }

  delete(id:number){
    this.api.DeleteEmpleado(id).subscribe((res:any)=>{
      if(!res.ok){
        Swal.Error("Error al Elimnar Empleados",res.body);
        return ;
      }
      for(let i=0;i<this.empleados.length;i++){
        if(this.empleados[i].id==id){
          const empts = Array<EmpleadoI>();
          this.empleados.filter((emp:EmpleadoI)=>{
            if(emp.id != id){
              empts.push(emp);
            }
          });
          this.empleados=empts;
          break;
        }
      }
      Swal.Success("Correcto",res.body);
    });

  }

}
