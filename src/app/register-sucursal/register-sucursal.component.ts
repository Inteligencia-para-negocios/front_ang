import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { SucursalService } from '../service/branch.service';

@Component({
  selector: 'app-register-sucursal',
  templateUrl: './register-sucursal.component.html',
  styleUrls: ['./register-sucursal.component.css']
})
export class RegisterSucursalComponent {
  constructor(private _formBuider: FormBuilder, private http: HttpClient, private _BRANCH_SERVICE : SucursalService ) { }

  registerForm = new FormGroup({
    sucursal: new FormControl('', [Validators.required, Validators.minLength(10)]),
    state: new FormControl('', [Validators.required]),
    sede: new FormControl('', [Validators.required]),
    route: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.registerForm = this._formBuider.group({
      sucursal: ['', Validators.requiredTrue],
      state: ['', Validators.requiredTrue],
      sede: ['', Validators.requiredTrue],
      route: ['', Validators.requiredTrue],
      address: ['', Validators.requiredTrue],
    })
  }

  registroSucursal() {
    console.log(this.registerForm.value)
    this._BRANCH_SERVICE.crear(this.registerForm.value).pipe(
      timeout(5000) // 5000 milisegundos = 5 segundos
    ).subscribe(
      (response) => {
        // Petición exitosa, muestra una alerta
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sucursal agregada',
          showConfirmButton: false,
          timer: 1500
        });        this.registerForm = this._formBuider.group({
          sucursal: ['', Validators.requiredTrue],
          state: ['', Validators.requiredTrue],
          sede: ['', Validators.requiredTrue],
          route: ['', Validators.requiredTrue],
          address: ['', Validators.requiredTrue],
        })
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: error.error.mesagge,
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }
}
