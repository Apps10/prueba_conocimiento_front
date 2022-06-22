import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './Empleados/inicio/inicio.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NewEmpleadoComponent } from './Empleados/new-empleado/new-empleado.component';
import { EditEmpleadoComponent } from './Empleados/edit-empleado/edit-empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NewEmpleadoComponent,
    EditEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
