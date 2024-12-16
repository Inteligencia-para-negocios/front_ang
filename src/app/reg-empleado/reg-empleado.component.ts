import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { timeout } from 'rxjs';
import Swal from 'sweetalert2';
import { ProviderService } from '../service/provider.service';
import { SucursalService } from '../service/branch.service';
import { Puesto, Sucursal } from 'src/models/interface';
import { UtilService } from '../service/util.service';
import { EmpleadoService } from '../service/empleado.service';

@Component({
  selector: 'app-reg-empleado',
  templateUrl: './reg-empleado.component.html',
  styleUrls: ['./reg-empleado.component.css']
})
export class RegEmpleadoComponent implements OnInit {

  public sucursales: Sucursal[] = []
  public puestos: Puesto[] = []
  loading: boolean | undefined;

  constructor(
    private _PROVIDER_SERVICE: EmpleadoService,
    private branch: SucursalService,
    private utserv: UtilService

  ) { }

  ngOnInit(): void {
    this.getBranch()
    this.getPuestos()
    this.captureForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      paterno: new FormControl('', [Validators.required]),
      materno: new FormControl('', [Validators.required]),
      curp: new FormControl('', [Validators.required]),
      rfc: new FormControl('', [Validators.required]),
      nss: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      colonia: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      estado_civil: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      idPuesto: new FormControl('', [Validators.required]),
      nombreFamiliar: new FormControl('', [Validators.required]),
      celularFamiliar: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      idSucursal: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      tipoLicencia: new FormControl('', [Validators.required]),
      numLicencia: new FormControl('', [Validators.required]),
      relacion: new FormControl('', [Validators.required]),
      fechaVencimiento: new FormControl('')
    })
  }


  captureForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    paterno: new FormControl('', [Validators.required]),
    materno: new FormControl('', [Validators.required]),
    curp: new FormControl('', [Validators.required]),
    rfc: new FormControl('', [Validators.required]),
    nss: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required]),
    colonia: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    estado_civil: new FormControl('', [Validators.required]),
    celular: new FormControl('', [Validators.required]),
    idPuesto: new FormControl('', [Validators.required]),
    nombreFamiliar: new FormControl('', [Validators.required]),
    celularFamiliar: new FormControl('', [Validators.required]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    sexo: new FormControl('', [Validators.required]),
    idSucursal: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    tipoLicencia: new FormControl('', [Validators.required]),
    numLicencia: new FormControl('', [Validators.required]),
    relacion: new FormControl('', [Validators.required]),
    fechaVencimiento: new FormControl('')
  })


  registerEmpleado() {
    console.log(this.captureForm.value)
  }


  registro() {
    console.log(this.captureForm.value)
    this._PROVIDER_SERVICE.crear(this.captureForm.value).pipe(
      timeout(1200)
    ).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Empleado registrado con exito!',
          showConfirmButton: false,
          timer: 1000
        });
        this.captureForm = new FormGroup({
          nombre: new FormControl('', [Validators.required]),
          paterno: new FormControl('', [Validators.required]),
          materno: new FormControl('', [Validators.required]),
          curp: new FormControl('', [Validators.required]),
          rfc: new FormControl('', [Validators.required]),
          nss: new FormControl('', [Validators.required]),
          estado: new FormControl('', [Validators.required]),
          municipio: new FormControl('', [Validators.required]),
          colonia: new FormControl('', [Validators.required]),
          direccion: new FormControl('', [Validators.required]),
          estado_civil: new FormControl('', [Validators.required]),
          celular: new FormControl('', [Validators.required]),
          idPuesto: new FormControl('', [Validators.required]),
          nombreFamiliar: new FormControl('', [Validators.required]),
          celularFamiliar: new FormControl('', [Validators.required]),
          fechaNacimiento: new FormControl('', [Validators.required]),
          sexo: new FormControl('', [Validators.required]),
          idSucursal: new FormControl('', [Validators.required]),
          area: new FormControl('', [Validators.required]),
          tipoLicencia: new FormControl('', [Validators.required]),
          numLicencia: new FormControl('', [Validators.required]),
          relacion: new FormControl('', [Validators.required]),
          fechaVencimiento: new FormControl('')
        })
      },
      (error) => {
        console.log(error.error)
        // Error en la petición, muestra una alerta
        Swal.fire('Error!', error.error.mesagge);
      }
    );
  }

  getBranch() {
    this.branch.getAll().subscribe({
      next: (data: any) => {
        this.sucursales = data[0] as Sucursal[]
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    })
  }

  getPuestos() {
    this.utserv.getPuestos().subscribe({
      next: (data: any) => {
        this.puestos = data as Puesto[]
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    })
  }

}
