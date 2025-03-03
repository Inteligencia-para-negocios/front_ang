import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Area, Cheque, Concept, Empleado, Provedor, Responsable, Sucursal, User } from 'src/models/interface';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cap-gastos',
  templateUrl: './cap-gastos.component.html',
  styleUrls: ['./cap-gastos.component.css']
})
export class CapGastosComponent implements OnInit {

  captureForm = new FormGroup({
    clasificacion: new FormControl({ value: '', disabled: true }, [Validators.required] ),
    partida: new FormControl({ value: '', disabled: true }, [Validators.required]),
    proveedor: new FormControl({ value: '', disabled: true }),
    efectivoSol: new FormControl({ value: '', disabled: true }, [Validators.required]),
    area: new FormControl({ value: '', disabled: true }),
    empresaSol: new FormControl({ value: '', disabled: true }, [Validators.required]),
    financiamiento: new FormControl({ value: '', disabled: false }, [Validators.required]),
    tipoDeGasto: new FormControl({ value: '', disabled: true }),
    justificacion: new FormControl({ value: '', disabled: true }, [Validators.required]),
    efectivoComprobado: new FormControl(sessionStorage.getItem('idUser') || localStorage.getItem('idUser')),
    comprobante: new FormControl({ value: '', disabled: false })
  })

  ngOnInit(): void {    
    const state = this.location.getState() as { gasto?: any };    
    if (state && state.gasto) {
      const comprobacion = state['gasto'];
      this.cargarDatos(comprobacion);
    }
  }

  cargarDatos(comprobacion: any) {
    let recurrente = ''
    if(comprobacion.recurrente)
      recurrente = "RECURRENTE"
    else
      recurrente = "NO RECURRENTE"
    this.captureForm.patchValue({
      clasificacion: comprobacion.clasificacion,
      partida: comprobacion.partida,
      proveedor: comprobacion.proveedor,
      empresaSol: comprobacion.empresa,
      area: comprobacion.area,
      tipoDeGasto: recurrente,
      efectivoSol: comprobacion.monto,
      justificacion: comprobacion.justificacion,
    });
    console.log("Datos: ",this.captureForm);
    
  }


  constructor(
    private location: Location,
    private _formBuider: FormBuilder,
  ) { }

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