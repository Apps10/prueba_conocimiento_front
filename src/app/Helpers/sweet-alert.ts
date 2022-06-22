import Swal from 'sweetalert2'

class SweetAlert {

  Confirm(title:string,text:string){
    return Swal.fire({
      title,
      text,
      icon: 'question',
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      showCancelButton:true
    });
  }


  Success(title:string,text:string){
    return Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'Cool'
    });
  }

  Error(title:string,text:string){
    return Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'Cool'
    });
  }

  Question(title:string,text:string){
    return Swal.fire({
      title,
      text,
      icon: 'question',
      confirmButtonText: 'Cool'
    });
  }

}

export default new SweetAlert();