import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProviderService } from '../service/provider.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { resolve } from 'chart.js/dist/helpers/helpers.options';


@Component({
  selector: 'app-register-provedor',
  templateUrl: './register-provedor.component.html',
  styleUrls: ['./register-provedor.component.css']
})
export class RegisterProvedorComponent {
  panelOpenState = false;


  estadoActual: string = 'remision'; // Estado inicial, puedes cambiarlo según tus necesidades
  bandera: boolean | undefined
  contratista: boolean | undefined;

  ngOnInit(): void {
    this.obtenerEstadoActual()
    this.registerForm = this._formBuider.group({
      razonSocial: ['', Validators.required],
      rfc: [''],
      state: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      cp: ['', Validators.required],
      entidad: ['', [Validators.required]],
      diasCred: ['', Validators.required],
      isContratista: ['',Validators.required]
    })
    this.registerForm.controls['isContratista'].setValue('0');

  }

  onToggleChange(event: any) {
    // Verificar si el checkbox está marcado o desmarcado
    const isChecked = event.target.checked;
    if (isChecked) {
      this.contratista = true
      this.registerForm.controls['isContratista'].setValue('1');
      console.log('es contratista', this.contratista);
    } else {
      this.contratista = false
      this.registerForm.controls['isContratista'].setValue('0');
      console.log('no es contratista', this.contratista);
    }

  }

  cambiarEstado(nuevoEstado: string) {
    this.estadoActual = nuevoEstado;
    if (this.estadoActual == 'remision') {
      this.bandera = false
      console.log('bandera verdadera cambio', this.bandera)
    } else {
      this.bandera = true
      console.log('bandera negativa cambio')
    }

    console.log(this.estadoActual)
  }

  obtenerEstadoActual() {
    if (this.estadoActual == 'remision') {
      this.bandera = false
      console.log('bandera negativa actual')
    } else {
      this.bandera = true
      console.log('bandera verdadera actual')
    }
    return this.estadoActual;
  }

  constructor(
    private _formBuider: FormBuilder,
    private http: HttpClient,
    private _PROVIDER_SERVICE: ProviderService,
    private _snackBar: MatSnackBar
  ) { }

  completed: any = 'completed';
  notCompleted: any = 'not-completed'

  registerForm = new FormGroup({
    razonSocial: new FormControl('', [Validators.required, Validators.minLength(10)]),
    rfc: new FormControl(''),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    cp: new FormControl('', [Validators.required]),
    entidad: new FormControl('', [Validators.required]),
    diasCred: new FormControl('', [Validators.required]),
    isContratista: new FormControl('',[Validators.required])
  })



  registro() {
    console.log(this.registerForm.value)
    this._PROVIDER_SERVICE.crear(this.registerForm.value).pipe(
      timeout(1200)
    ).subscribe(
      (response) => {
        console.log("=>",response)
        Swal.fire('Registro exitoso!', 'Tu provedor ha sido registrado con exito');
      },
      (error) => {
        console.log(error)
        Swal.fire('Error!',error);
      }
    );
  }

  // openSnackBar() {
  //   this._snackBar.open("Se registrara como contratista", "Action")
  // }
  // estadosTarjetas: { [key: number]: string } = {};

  // checker(idGastoRev: number, nuevoEstado: string) {
  //   this.estadosTarjetas[idGastoRev] = nuevoEstado;
  //   if (nuevoEstado === 'inactiva') {
  //     console.log(`La tarjeta con idGastoRev ${idGastoRev} cambió a activa`);

  //   } else {
  //     console.log(`La tarjeta con idGastoRev ${idGastoRev} cambió a inactiva`);
  //   }
  //   console.log("Estado actual >>>>>", this.estadosTarjetas[idGastoRev]);
  // }
}
