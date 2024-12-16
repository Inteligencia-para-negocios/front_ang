import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SucursalService } from '../service/branch.service';
import { Area, Cheque, Concept, Empleado, Provedor, Responsable, Sucursal, User } from 'src/models/interface';
import { AreaService } from '../service/area.service';
import { UserService } from '../service/user.service';
import { ProviderService } from '../service/provider.service';
import { ReporteService } from '../service/reporte.service';
import Swal from 'sweetalert2';
import { CapGastos } from '../service/cap-gastos.service';
import { timeout } from 'rxjs';
import { CapChequeService } from '../service/cap-cheque.service';
import { EmpleadoService } from '../service/empleado.service';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-cap-gastos',
  templateUrl: './cap-gastos.component.html',
  styleUrls: ['./cap-gastos.component.css']
})
export class CapGastosComponent implements OnInit {


  ngOnInit(): void {
    this.getBranch()
    this.getArea()
    this.getUser()
    this.getProvider()
    this.getConcept()
    this.getCheque()
    this.getEmpleado()
    this.getRevolvente()
    this.obtenerEstadoActual()
    this._UTIL_SERVICE_.verificarVentanaActiva();
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
  public remanenteChequeSelect : number  = 0
  estadoActual: string = 'remision'; // Estado inicial, puedes cambiarlo según tus necesidades
  bandera: boolean | undefined

  constructor(
    private branch: SucursalService,
    private area: AreaService,
    private user: UserService,
    private provide: ProviderService,
    private _REPORT_SERVICE: ReporteService,
    private _SERVICE_GASTIS: CapGastos,
    private _formBuider: FormBuilder,
    private _SERVICE_CHEQUE: CapChequeService,
    private _EMPLEADO_SERVICE: EmpleadoService,
    private _UTIL_SERVICE_ : UtilService
  ) { }

  captureForm = new FormGroup({
    idBranch: new FormControl('', [Validators.required]),
    idProvedor: new FormControl('', [Validators.required]),
    cheque: new FormControl(''),
    efectivoLib: new FormControl('', [Validators.required]),
    area: new FormControl(''),
    idConcept: new FormControl('', [Validators.required]),
    responsable: new FormControl('', [Validators.required]),
    idRevolvente: new FormControl(''),
    justificacion: new FormControl('', [Validators.required]),
    idUser: new FormControl(sessionStorage.getItem('idUser') || localStorage.getItem('idUser')),
    factura : new FormControl('')
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

  obtenerEstadoActual() {
    if (this.estadoActual == 'remision') {
      this.bandera = false
      console.log('estado actual', this.bandera)
    } else {
      this.bandera = true
      console.log('estado actual ::', this.bandera)
    }
    return this.estadoActual;
  }

  usuario = new FormGroup({
    usuario: new FormControl(sessionStorage.getItem('usuario') || localStorage.getItem('usuario'))
  })

  getEmpleado() {
    this._EMPLEADO_SERVICE.getAll().subscribe({
      next: (data: any) => {
        this.empleados = data as Empleado[]
        console.log("=====>", this.empleados)
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    })
  }

  onChangeSucursal(selectedSucursal: string) {
    console.log("sucursal -->", selectedSucursal)
    try {
      const sucursal = {
        "sucursal": selectedSucursal
      }
      //27
      if (selectedSucursal == '27') {
        this.sucu = true
        console.info(":::::: Extrayendo la informacion del encargado correspondiente a la sucursal.")

        this._SERVICE_GASTIS.getResp(sucursal).subscribe({
          next: (data: any) => {
            this.responsables = data[0].RazonSocial
            console.log("::::::get data responsables:::::::")
            //console.log(this.responsables)
            if (this.responsables != null) {
              this.respons = false
            } else {
              this.respons = true
            }
            setTimeout(() => {
              this.loading = false
            }, 1000)
          }
        })
      } else {
        this.sucu = false
      }

      console.log(this.respons)
    } catch (error) {
      console.log(error)
    }
  }

  onChangeResp(resp: string) {
    console.log("Log:::::responsable: : : : : : ", resp)
  }

  capturaGasto() {
    console.info('::::: captura de gastos')
    console.log(this.captureForm.value)
    if (this.captureForm.value.idRevolvente) {
      console.log("remisionados para cortes parciales")
      this._REPORT_SERVICE.registrarGastoRev(this.captureForm.value).pipe().subscribe(
        (response) => {
          console.log(response)
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
            factura : new FormControl( '')
          })
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha registrado el gasto',
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        },
        (error) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: error.error,
            text: error.error,
            showConfirmButton: false,
            timer: 3000
          });
        }
      )
    } else {
      console.log("facturados para ver en contabilidad")
      this._REPORT_SERVICE.crear(this.captureForm.value).pipe(
        timeout(5000) // 5000 milisegundos = 5 segundos
      ).subscribe(
        (response) => {
          console.log(response)
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
          window.location.reload();
        },
        (error) => {
          console.log(error)
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: error.error.title,
            text: error.error.mesagge,
            showConfirmButton: false,
            timer: 3000
          });
        }
      );
    }


  }

  getRevolvente() {
    this._REPORT_SERVICE.getRevolvente().subscribe({
      next: (data: any) => {
        this.revolventes = data as any
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    })
  }


  getArea() {
    this.area.getAll().subscribe({
      next: (data: any) => {
        this.areas = data as Area[]
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    })
  }

  getConcept() {
    this._SERVICE_GASTIS.concept().subscribe({
      next: (data: any) => {
        this.conceptos = data as Concept[]
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    })
  }

  getProvider() {
    this.provide.getAll().pipe(
      timeout(5000) // 5000 milisegundos = 5 segundos
    ).subscribe(
      (response) => {
        this.provider = response as Provedor[]

      },
      (error) => {
        console.log(error)
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Atención!',
          text: error.error.mensaje,
          showConfirmButton: false,
          timer: 3000
        });
      }
    );
  }

  getUser() {
    this.user.getAll().subscribe({
      next: (data: any) => {
        this.users = data as User[]
        if (this.users.length = 0) {
          setTimeout(() => {
            this.loading = false
          })
        }
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    })
  }

  getBranch() {
    this.branch.getAll().subscribe({
      next: (data: any) => {
        this.sucursales = data[0] as Sucursal[]
        console.log(this.sucursales)
        // this.getFAMSucursales()
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    })
  }
  // getFAMSucursales() {
  //   this.sucursalfilter = this.sucursales.filter((sucursal) => sucursal.sede === 'FORANEA' || sucursal.sede === 'LOCAL');
  // }

//se necesita realizar una peticiion para las necesidades del cheque y asu poder tener en cuenta todas las cosas que se necesitan

  getCheque() {
    this._SERVICE_CHEQUE.getChUser(this.usuario.value).pipe(
      timeout(6000)
    ).subscribe({
      next: (data: any) => {
        this.cheques = data as Cheque[];
        
        // Aplicar filtro para obtener solo los cheques con estado "abierto"
        this.cheques = this.cheques.filter(cheque => cheque.nameStatus === 'ABIERTO');
        
        console.log("Cheques desde gastos -:>>", this.cheques);
      }
    });
  }
  verifyPercentage(id: number) {
    const cheque = {
      "cheque": id
    }
    console.log("Cheque de usuario para checar el porcentaje: ", id)
    console.log(":::::: verfy percentage banckcheck ::::::")
    this._SERVICE_CHEQUE.verify(cheque).subscribe({
      next: (data: any) => {
        // console.log("monto para sacar el porcentaje",)
        this.remanenteChequeSelect = data['remanente']
        var porcentaje = (data['amount'] * .20)
        var porcentaje1 = (data['amount'] * .05)
        console.log("Porcentaje ---> ", porcentaje)
        // if (porcentaje >= data['remanenteVirtual']) {
        //   Swal.fire({
        //     position: 'center',
        //     icon: 'warning',
        //     title: 'Atención!',
        //     text: 'Haz llegado al 20% de fluides',
        //     showConfirmButton: false,
        //     timer: 3000
        //   });
        //   if (porcentaje1 >= data['remanenteVirtual']) {
        //     Swal.fire({
        //       position: 'center',
        //       icon: 'error',
        //       title: 'Atención!',
        //       text: 'Haz llegado al 5% de fluides',
        //       showConfirmButton: false,
        //       timer: 3000
        //     });
        //     // this._SERVICE_CHEQUE.cheuqeUpdate(cheque).subscribe({
        //     //   next: (data: any) => {
        //     //     console.groupCollapsed(data)
        //     //   }
        //     // }),
        //      timeout(3000)
        //    //window.location.reload();
        //   }

        // } else {
        //   console.log("Se te paso alv")
        // }
      }
    })
  }
  formatMonto(monto: number): string {
    return `$${monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

}

// ${ version } ${ account - id } ${ interface - id } ${ srcaddr } ${ dstaddr } ${ srcport } ${ dstport } ${ protocol } ${ packets } ${ bytes } ${ start } ${ end } ${ action } ${ log - status }