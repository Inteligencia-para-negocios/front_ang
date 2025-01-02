import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Area, Cheque, Concept, Empleado, Provedor, Responsable, Sucursal, User } from 'src/models/interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cap-gastos',
  templateUrl: './cap-gastos.component.html',
  styleUrls: ['./cap-gastos.component.css']
})
export class CapGastosComponent implements OnInit {


  ngOnInit(): void {
    // this.obtenerEstadoActual()
  }
  public cheques: Cheque[] = []
  public sucursales: Sucursal[] = []
  public sucursalfilter: Sucursal[] = []
  public areas: Area[] = []
  public users: User[] = []
  public conceptos: Concept[] = []
  public provider: Provedor[] = []
  public responsables = []
  public loading: boolean = true
  public sucursal: string | undefined
  public respons: boolean | undefined
  public sucu: boolean = false
  public empleados: Empleado[] = [];
  public revolventes: any[] = []
  public remanenteChequeSelect: number = 0
  estadoActual: string = 'remision'; // Estado inicial, puedes cambiarlo según tus necesidades
  bandera: boolean | undefined

  constructor(

    private _formBuider: FormBuilder,
  ) { }

  captureForm = new FormGroup({
    clasificacion: new FormControl('', [Validators.required]),
    partida: new FormControl('', [Validators.required]),
    idProvedor: new FormControl(''),
    efectivoSol: new FormControl('', [Validators.required]),
    area: new FormControl(''),
    empresaSol: new FormControl('', [Validators.required]),
    financiamiento: new FormControl('', [Validators.required]),
    tipoDeGasto: new FormControl(''),
    justificacion: new FormControl('', [Validators.required]),
    efectivoComprobado: new FormControl(sessionStorage.getItem('idUser') || localStorage.getItem('idUser')),
    comprobante: new FormControl('')
  })

  cambiarEstado(nuevoEstado: string) {
    this.estadoActual = nuevoEstado;
    if (this.estadoActual == 'remision') {
      this.bandera = false
      console.log('bandera verdadera cambio', this.bandera)
    } else {
      this.bandera = true
      console.log('bandera negativa cambio', this.bandera)
    }
    console.log(this.estadoActual)
  }


  usuario = new FormGroup({
    usuario: new FormControl(sessionStorage.getItem('usuario') || localStorage.getItem('usuario'))
  })

  onChangeResp(resp: string) {
    console.log("Log:::::responsable: : : : : : ", resp)
  }

  capturaGasto() {
    console.info('::::: captura de gastos')
    console.log(this.captureForm.value)
    if (this.captureForm.value) {
      console.log("remisionados para cortes parciales")
      this._formBuider.group({
        idBranch: new FormControl(''),
        idProvedor: new FormControl(''),
        cheque: new FormControl(''),
        efectivoLib: new FormControl(''),
        area: new FormControl(''),
        idConcept: new FormControl(''),
        responsable: new FormControl(''),
        justificacion: new FormControl(''),
        idUser: new FormControl(' '),
        factura: new FormControl('')
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha registrado el gasto',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.log("facturados para ver en contabilidad")
      this._formBuider.group({
        idBranch: new FormControl(''),
        idProvedor: new FormControl(''),
        cheque: new FormControl(''),
        efectivoLib: new FormControl(''),
        area: new FormControl(''),
        idConcept: new FormControl(''),
        responsable: new FormControl(''),
        justificacion: new FormControl(''),
        idUser: new FormControl(' '),
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha registrado el gasto',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  // getFAMSucursales() {
  //   this.sucursalfilter = this.sucursales.filter((sucursal) => sucursal.sede === 'FORANEA' || sucursal.sede === 'LOCAL');
  // }

  //se necesita realizar una peticiion para las necesidades del cheque y asu poder tener en cuenta todas las cosas que se necesitan
  formatMonto(monto: number): string {
    return `$${monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

}

// ${ version } ${ account - id } ${ interface - id } ${ srcaddr } ${ dstaddr } ${ srcport } ${ dstport } ${ protocol } ${ packets } ${ bytes } ${ start } ${ end } ${ action } ${ log - status }