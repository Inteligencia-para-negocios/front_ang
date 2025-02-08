import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleError(error: any): void {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: error.error?.sqlMessage || 'Ocurrió un error inesperado',
      showConfirmButton: false,
      timer: 3000,
    });
  }
}
