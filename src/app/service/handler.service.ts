import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  handleError(): void {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocurrió un error inesperado',
      showConfirmButton: false,
      timer: 3000,
    });
  }

  handleSuccess(): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registro Creado con exito',
      showConfirmButton: false,
      timer: 3000,
    });
  }

  handleWarning(): void {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'ALERTA',
      showConfirmButton: false,
      timer: 3000,
    });
  }
}
