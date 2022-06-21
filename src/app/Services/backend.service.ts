import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:5000/api/";

  public GetEmpleadosAll(){
    return this.http.get(`${this.url}empleado`);
  }

  public DeleteEmpleado(id:number){
    return this.http.delete(`${this.url}empleado/${id}`);
  }


}
