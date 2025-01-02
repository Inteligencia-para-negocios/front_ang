import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { SucursalService } from '../service/branch.service';
import { AuthService } from '../service/auth.service';
import { Area, Concept, Empleado, Presupuesto, Provedor, Sucursal, } from 'src/models/interface';
import { HttpClient } from '@angular/common/http';
import { AreaService } from '../service/area.service';
import { ProviderService } from '../service/provider.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-solicitud-gasto',
  templateUrl: './solicitud-gasto.component.html',
  styleUrls: ['./solicitud-gasto.component.css'],
})

export class SolicitudGastoComponent implements OnInit {
  estadoActual: string = 'obras'; // Estado inicial, puedes cambiarlo según tus necesidades
  bandera: boolean | undefined;
  todos: string[] = [];
  dias: number = 0
  flag: boolean | undefined
  empleados: Empleado[] | undefined;

  public sucursales: Sucursal[] = [];
  public areas: Area[] = [];
  public conceptos: Concept[] = [];
  public provider: Provedor[] = [];
  public arrayPresupuestos: Presupuesto[] = [];
  public arrayContratistas: Provedor[] = [];
  public asignaciones: any[] = []

  constructor(
    private _formBuider: FormBuilder,

    private area: AreaService,
  ) { }

  captureForm = new FormGroup({
    clasificacion: new FormControl('', [Validators.required]),
    concepto: new FormControl('', [Validators.required]),
    partida: new FormControl('', [Validators.required]),
    efectivoSol: new FormControl('', [Validators.required]),
    presupuesto: new FormControl('', [Validators.required]),
    empresa: new FormControl(''),
    area: new FormControl('', [Validators.required]),
    encargado: new FormControl({ value: '', disabled: true }, [Validators.required]),
    justificacion: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void { }

  // solicitudGasto() {
  //   console.log("---> ", this.captureForm.value);
  // }

  verifyMounts(monto: Number) {
    console.log("Monto solicitado -> ", monto)
    // console.log("->", this.captureForm.get('asignacion')?.value)
  }

  solicitudGasto() {
    console.info('::::: captura de gastos')
    console.log(this.captureForm.value)
    if (this.captureForm.value) {
      console.log("remisionados para cortes parciales")
      this._formBuider.group({
        clasificacion: new FormControl('', [Validators.required]),
        concepto: new FormControl('', [Validators.required]),
        partida: new FormControl('', [Validators.required]),
        efectivoSol: new FormControl('', [Validators.required]),
        presupuesto: new FormControl('', [Validators.required]),
        empresa: new FormControl(''),
        area: new FormControl('', [Validators.required]),
        encargado: new FormControl({ value: '', disabled: true }, [Validators.required]),
        justificacion: new FormControl('', [Validators.required]),
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha registrado la solicitud',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.log("facturados para ver en contabilidad")
      this._formBuider.group({
        clasificacion: new FormControl('', [Validators.required]),
        concepto: new FormControl('', [Validators.required]),
        partida: new FormControl('', [Validators.required]),
        efectivoSol: new FormControl('', [Validators.required]),
        presupuesto: new FormControl('', [Validators.required]),
        empresa: new FormControl(''),
        area: new FormControl('', [Validators.required]),
        encargado: new FormControl({ value: '', disabled: true }, [Validators.required]),
        justificacion: new FormControl('', [Validators.required]),
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha registrado la solicitud',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
