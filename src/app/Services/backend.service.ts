import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailEmpleadoI, EmpleadoI, TelefonoEmpleadoI } from '../Interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:5000/api/";

  public GetEmpleadosAll(){
    return this.http.get(`${this.url}empleado`);
  }

  public newEmpleado(empleado:EmpleadoI){
    return this.http.post(`${this.url}empleado`,empleado);
  }
  public GetEmpleadoById(id_empleado:string){
    return this.http.get(`${this.url}empleado/${id_empleado}`);
  }

  public DeleteEmpleado(id:number){
    return this.http.delete(`${this.url}empleado/${id}`);
  }

  public UpdateEmpleado(id:number,Empleado:EmpleadoI){
    return this.http.put(`${this.url}empleado/${id}`,Empleado);
  }




  public NewEmail(email:EmailEmpleadoI){
    return this.http.post(`${this.url}empleado/email`,email);
  }

  public DeleteEmail(id_email:number){
    return this.http.delete(`${this.url}empleado/email/${id_email}`);
  }

  public GetEmails(id_email:number){
    return this.http.get(`${this.url}empleado/email/${id_email}`);
  }


  public NewTelefono(tel:TelefonoEmpleadoI){
    return this.http.post(`${this.url}empleado/telefono`,tel);
  }

  public GetTelefonos(id_empleado:string){
    return this.http.get(`${this.url}empleado/telefono/${id_empleado}`);
  }

  public DeleteTelefono(id_telefono:number){
    return this.http.delete(`${this.url}empleado/telefono/${id_telefono}`);
  }


}
