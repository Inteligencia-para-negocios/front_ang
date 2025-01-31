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
import { ClassificationService } from '../service/classification.service';
import { UtilService } from '../service/util.service';
import { UserService } from '../service/user.service';
import { PresupuestoService } from '../service/presupuesto.service';



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

  public partidas: any[] = [];
  public clasificaciones : any [] = [];
  public areas: Area[] = [];
  public conceptos: Concept[] = [];
  public provider: Provedor[] = [];
  public arrayPresupuestos: Presupuesto[] = [];
  public arrayContratistas: Provedor[] = [];
  public asignaciones: any[] = []

  constructor(
    private _formBuider: FormBuilder,
    private clasftion: ClassificationService,
    private area: AreaService,
    private util : UtilService,
    private user: UserService,
    private presp: PresupuestoService
  ) { }
  
  ngOnInit(): void {
    this.getPartidas()
    this.getDatosEmpleado()
  }
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


  // solicitudGasto() {
  //   console.log("---> ", this.captureForm.value);
  // }


  getDatosEmpleado(){
    console.log(this.user.getUser());
  }

  getClasificacionesPorPartida(){
    
  }
  

  getPartidas(){
    this.util.getPartida().subscribe({
      next: (data: any) => {
        console.log(data)
          this.partidas = data
          console.log(this.partidas)
        },
        error(err) {
              console.error(err);
              Swal.fire({
              position: 'center',
              icon: 'error',
              title: err.error.sqlMessage,
              showConfirmButton: false,
              timer: 3000
            }); 
          },
        })
  }

  async onChangeResp(resp: string) {
    (await this.clasftion.getAllClasificaciones(resp)).subscribe({
      next: (data: any) => {
        console.log('Datos recibidos:', data); // Depuración de la respuesta
        this.clasificaciones = data; // Asignando los datos a la variable
        console.log('Clasificaciones:', this.clasificaciones); // Verificando el valor de 'partidas'
      },
      error: (err) => {
        console.error('Error al obtener clasificaciones:', err);
        // Manejo de error con Swal
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: err?.error?.sqlMessage || 'Error desconocido',
          showConfirmButton: false,
          timer: 3000
        });
      }
     });
  }

  async verfyPresupuesto(){
   
  }

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
