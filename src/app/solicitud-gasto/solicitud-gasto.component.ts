import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators,FormBuilder,} from '@angular/forms';
import { SucursalService } from '../service/branch.service';
import { AuthService } from '../service/auth.service';
import { Area,Concept,Empleado,Presupuesto,Provedor,Sucursal,} from 'src/models/interface';
import { HttpClient } from '@angular/common/http';
import { AreaService } from '../service/area.service';
import { UserService } from '../service/user.service';
import { ProviderService } from '../service/provider.service';
import { ReporteService } from '../service/reporte.service';
import Swal from 'sweetalert2';
import { CapGastos } from '../service/cap-gastos.service';
import { UtilService } from '../service/util.service';
import { EmpleadoService } from '../service/empleado.service';
import { CapGastosComponent } from '../cap-gastos/cap-gastos.component';
import { CaptContraComponent } from '../capt-contra/capt-contra.component';
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
  dias : number = 0
  flag : boolean | undefined
  empleados: Empleado[] | undefined;

  

  cambiarEstado(nuevoEstado: string) {
    this.estadoActual = nuevoEstado;
    if (this.estadoActual === 'viaticos') {
      this.bandera = false;
      console.log('bandera verdadera cambio', this.bandera);
    } else if (this.estadoActual === 'rutas') {
      this.bandera = true;
      console.log('bandera rutas cambio');
    }else if (this.estadoActual === 'obras') {
      this.bandera = true;
      console.log('bandera obras cambio');
    } else {
      this.bandera = true;
      console.log('bandera negativa cambio');
    }
    console.log("usuario ->", this.estadoActual);
  }


  obtenerEstadoActual() {
    if (this.estadoActual == 'transferencia') {
      this.bandera = true;
      console.log('bandera verdadera actual');
    } else {
      this.bandera = false;
      console.log('bandera negativa actual');
    }
    return this.estadoActual;
  }

  public sucursales: Sucursal[] = [];
  public areas: Area[] = [];
  public conceptos: Concept[] = [];
  public provider: Provedor[] = [];
  public arrayPresupuestos: Presupuesto[] = [];
  public arrayContratistas: Provedor[] = [];
  public asignaciones: any[] = []

  constructor(
    private branch: SucursalService,
    private _SERVICE_GASTIS: CapGastos,
    private _UTIL_SERVICE: UtilService,
    private _Providers_: ProviderService,
    private _EMPLEADO_SERVICE: EmpleadoService,
    private area: AreaService,
    private asigned: PresupuestoService
  ) {}

  captureForm = new FormGroup({
    provedor: new FormControl('', [Validators.required]),
    concepto: new FormControl('', [Validators.required]),
    asignacion: new FormControl('', [Validators.required]),
    efectivoSol: new FormControl('', [Validators.required]),
    presupuesto: new FormControl('', [Validators.required]),
    sucursal: new FormControl(''),
    area: new FormControl('', [Validators.required]),
    encargado: new FormControl({value:'', disabled: true}, [Validators.required]),
    justificacion: new FormControl('', [Validators.required]),
    idUser: new FormControl(sessionStorage.getItem('idUser')|| localStorage.getItem('idUser'),[Validators.required]),
    transferencia: new FormControl(''),
    actividad : new FormControl(''),
    sucursalDestino : new FormControl(''),
    fechaDgasto : new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.getConcept();
    this.getBranch();
    this.getListContratistas()
    this.getEmpleado()
    this.getArea()
    this.getAsignaciones()
    this.verifyConcept(this.estadoActual)
    // this.getListPresupuestos();
  }

  solicitudGasto() {
    console.log("---> ",this.captureForm.value);
  }
//con esta verificacion estaremos verificando cuando cambia de estado un boton para de 
//terminar de que manera podemos ejecutar un gasto y cambiar el comportamiento de la aplicacion.

  verifyConcept(estadoActual : any){
    switch (estadoActual) {
      case "obras":
        console.info("Cambiando concepto")
        this.captureForm.get('concepto')?.setValue('1')
        break;
      case "rutas":
        this.captureForm.get('concepto')?.setValue('28')

        break;
      case "viaticos" :
        break;
      default:
        break;
    }
  }

  verifyMounts(monto : Number ){
    console.log("Monto solicitado -> ", monto)
    console.log("->",this.captureForm.get('asignacion')?.value)
  }

  verifyDays(){
    if(this.dias > 0){
      this.flag = true
    }
  }

  getArea() {
    this.area.getAll().subscribe({
      next: (data: any) => {
        this.areas = data as Area[]
        setTimeout(() => {
        }, 1000)
      }
    })
  }



  getEmpleado() {
    this._EMPLEADO_SERVICE.getAll().subscribe({
      next: (data: any) => {
        this.empleados = data as Empleado[]
        //console.log("=====>", this.empleados)
        setTimeout(() => {
          //this.loading = false
        }, 1000)
      }
    })
  }

  getListContratistas() {
    this._Providers_.getContatistas().subscribe({
      next: (data: any) => {
        this.arrayContratistas = data as Provedor[]
        //console.log("contratistas ->", this.arrayContratistas)
        setTimeout(() => {
        }, 1000)
      }
    })
  }

  getAsignaciones(){
    this.asigned.getList().subscribe({
      next :(data: any) =>{
        this.asignaciones = data
        //console.log("asignaciones -> ", this.asignaciones) 
      }
    })
  }

  getConcept() {
    this._SERVICE_GASTIS.concept().subscribe({
      next: (data: any) => {
        this.conceptos = data as Concept[];
        //console.log(this.conceptos);
        setTimeout(() => {}, 1000);
      },
    });
  }

  getBranch() {
    this.branch.getAll().subscribe({
      next: (data: any) => {
        this.sucursales = data[0] as Sucursal[];
        //console.log(this.sucursales);
        setTimeout(() => {}, 1000);
      },
    });
  }

}
