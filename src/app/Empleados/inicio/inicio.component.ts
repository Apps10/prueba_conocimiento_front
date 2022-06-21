import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { EmpleadoI } from "../../Interfaces/empleado";

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
        alert(response.body);
      }
      this.empleados=response.body;
    });
  }

  delete(id:number){
    this.api.DeleteEmpleado(id).subscribe((res:any)=>{
      if(!res.ok){
        alert(res.body);
        return;
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
      alert(res.body);
    });

  }

  showEmail(id:number){
    console.log(id);
  }

  showTelefono(id:number){
    console.log(id);
  }

}
