export interface EmpleadoI{
    id?:number,
    nombres:string,
    apellidos:string,
    tipoIdentificacion:string,
    identificacion:string,
    fecha_ingreso?:Date
}



export interface EmailEmpleadoI{
    id?:number,
    email:string,
    personaId:number
}




export interface TelefonoEmpleadoI{
    id?:number,
    Tipo:string,
    numero:string,
    indicativo:string,
    personaId:number
}

