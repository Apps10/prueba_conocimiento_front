import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailEmpleadoI,EmpleadoI,TelefonoEmpleadoI } from "../../Interfaces/empleado";

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.css']
})
export class EditEmpleadoComponent implements OnInit {
  emails:Array<EmailEmpleadoI> = [];
  telefonos:Array<TelefonoEmpleadoI> = [];
  id="";
  empleado:any = [];

  constructor(private routeActive:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.routeActive.params);
  }

  deleteEmail(id:number){

  }

  deleteTel(id:number){

  }

}
