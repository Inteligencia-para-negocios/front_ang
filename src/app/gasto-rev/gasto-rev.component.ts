import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { timeout } from 'rxjs';
import Swal from 'sweetalert2';
import { CapTransfService } from '../service/cap-transf.service';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-gasto-rev',
  templateUrl: './gasto-rev.component.html',
  styleUrls: ['./gasto-rev.component.css']
})
export class GastoRevComponent {

  constructor(private _formBuider: FormBuilder, private http: HttpClient, private _TRANSF_SERVICE: UtilService) {

  }

  completed: any = 'completed';
  notCompleted: any = 'not-completed'

  captureForm = new FormGroup({
    folio: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern('[0-9]*')]),
    monto: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    asigned : new FormControl('',[Validators.required])
  })

  getErrorMessage() {
    if (this.captureForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.captureForm.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
    this.captureForm = this._formBuider.group({
      folio: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern('[0-9]*')]),
      monto: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      asigned : new FormControl('',[Validators.required])

    })
  }

  registroRevol() {
    console.log('dd', this.captureForm.errors);
    console.log("Registo del gasto:", this.captureForm.value)
    this._TRANSF_SERVICE.create(this.captureForm.value).pipe(
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
          folio: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern('[0-9]*')]),
          monto: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
          asigned : new FormControl('',[Validators.required])

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
}
