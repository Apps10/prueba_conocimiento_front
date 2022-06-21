import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmpleadoComponent } from './Empleados/edit-empleado/edit-empleado.component';
import { InicioComponent } from './Empleados/inicio/inicio.component';
import { NewEmpleadoComponent } from './Empleados/new-empleado/new-empleado.component';


const routes: Routes = [
  { path:"" , component:InicioComponent },
  { path:"empleado/new" , component:NewEmpleadoComponent },
  { path:"empleado/edit/:id" , component:EditEmpleadoComponent },
  //{ path:"*", redirectTo:"",   pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
