import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Area, Cheque, Concept, Empleado, Provedor, Responsable, Sucursal, User } from 'src/models/interface';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { UtilService } from '../service/util.service';
import { HandlerService } from '../service/handler.service';
import { GastoService } from '../service/gasto.service';

@Component({
  selector: 'app-cap-gastos',
  templateUrl: './cap-gastos.component.html',
  styleUrls: ['./cap-gastos.component.css']
})
export class CapGastosComponent implements OnInit {
  
  public formData = new FormData();
  public empresas: any[] = [];
  private gastoSec = "" ;
  constructor(
    private location: Location,
    private _formBuider: FormBuilder,
    private util: UtilService,
    private handler: HandlerService,
    private gastoServices: GastoService
  ) { }

  
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
    comprobante: new FormControl({ value: null, disabled: false })
  })

  ngOnInit(): void {
    this.getEmpresas();
    const state = this.location.getState() as { gasto?: any };    
    if (state && state.gasto) {
      const comprobacion = state['gasto'];
      this.cargarDatos(comprobacion);
    }
  }

  cargarDatos(comprobacion: any) {
    let recurrente = ''
    this.gastoSec = comprobacion.idGasto;
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
  }

  getEmpresas(){
    this.util.getEmpresas().subscribe({
      next: (data: any) => { this.empresas = data; },
      error: (err) => this.handler.handleError(),
    });
  }

  capturaGasto() {
    const formData = new FormData(); // Crear una nueva instancia en cada petición
  
    formData.append('idGasto', this.gastoSec);
    formData.append('monto', this.captureForm.value.efectivoComprobado?.toString() || '');
    formData.append('idEmpresa', this.captureForm.value.financiamiento?.toString() || '');
  
    if (this.archivoSeleccionado) {
      formData.append('archivo', this.archivoSeleccionado);
    } else {
      console.error("No se ha seleccionado un archivo.");
      return; // Evitar enviar la solicitud sin archivo
    }
  
    this.gastoServices.comprobacion(formData).subscribe({
      next: (data: any) => { this.handler.handleSuccess(); },
      error: (err) => { this.handler.handleError(); }
    });
  }
  

  archivoSeleccionado!: File; // Variable para almacenar el archivo seleccionado
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0]; // Guardar archivo en variable
      console.log("Archivo seleccionado:", this.archivoSeleccionado);
    }
  }

}
