import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CapTransfService } from '../service/cap-transf.service';

@Component({
  selector: 'app-cap-transfer',
  templateUrl: './cap-transfer.component.html',
  styleUrls: ['./cap-transfer.component.css']
})
export class CapTransferComponent {
  constructor(private _formBuider: FormBuilder, private http: HttpClient, private _TRANSF_SERVICE: CapTransfService) { }

  completed: any = 'completed';
  notCompleted: any = 'not-completed'
  user = 1
  captureForm = new FormGroup({
    account: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern('[0-9]*')]),
    destinatario: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    mount: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    referencia: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    user: new FormControl(this.user)
  })

  getErrorMessage() {
    if (this.captureForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.captureForm.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
    this.captureForm = this._formBuider.group({
      account: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern('[0-9]*')]),
      destinatario: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      mount: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      referencia: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      user: new FormControl(this.user)
    })
  }

  registroTransfer() {
    console.log('dd', this.captureForm.errors);
    console.log(this.captureForm.value)
    this._TRANSF_SERVICE.crear(this.captureForm.value).pipe(
      timeout(5000) // 5000 milisegundos = 5 segundos
    ).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: false,
          timer: 3000
        });

        this.captureForm = this._formBuider.group({
          account: new FormControl('', [Validators.required,Validators.pattern('[0-9]*')]),
          destinatario: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
          mount: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
          referencia: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
          user: new FormControl(this.user)

        })
      },
      (error) => {
        console.log(error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: error.error.mesagge,
          showConfirmButton: false,
          timer: 3000
        });
      }
    );
  }

  cancelar() {
    Swal.fire({
      text: "se esta cancelando el registro!",
      confirmButtonColor: '#3085d6',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    }
    ).then((result1) => {
      if (result1) {
        location.reload()
      }
    })
  }


  // isValid() {
  //   console.log("Folio", this.captureForm.value.folio)
  //   let folio = this.captureForm.value.folio
  //   console.log(folio?.length)
  // }
}
