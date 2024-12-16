import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area, Concept, Empleado, Presupuesto, Provedor, Sucursal, User } from 'src/models/interface';
import { CapGastos } from '../service/cap-gastos.service';
import Swal from 'sweetalert2';
import { timeout } from 'rxjs';
import { ProviderService } from '../service/provider.service'
import { AreaService } from '../service/area.service';
import { SucursalService } from '../service/branch.service';
import { UserService } from '../service/user.service';
import { fi } from 'date-fns/locale';


@Component({
  selector: 'app-gastos-revolventes',
  templateUrl: './gastos-revolventes.component.html',
  styleUrls: ['./gastos-revolventes.component.css']
})


export class GastosRevolventesComponent {
  public provider: Provedor[] = []
  public sucursales: Sucursal[] = []
  public areas: Area[] = []
  public users: User[] = []
  estadoActual: string = 'gastos'; // Estado inicial, puedes cambiarlo según tus necesidades
  estadoCheck: string = 'activo'; // Estado inicial, puedes cambiarlo según tus necesidades
  bandera: boolean | undefined
  public recurrentes: any[] = [];

  constructor(
    private _formBuider: FormBuilder,
    private _SERVICE_GASTIS: CapGastos,
    private branch: SucursalService,
    private area: AreaService,
    private user: UserService,
    private provide: ProviderService,
  ) { }

  public conceptos: Concept[] = []

  completed: any = 'completed';
  notCompleted: any = 'not-completed'
  public presp: Boolean | undefined

  captureForm = new FormGroup({
    empleado: new FormControl('0', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    periodo: new FormControl('', [Validators.required]),
    name: new FormControl('', Validators.required),
    branch: new FormControl('', [Validators.required]),
    monto: new FormControl('', [Validators.required]),
    servicio: new FormControl('', [Validators.required]),
    provedor: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.getBranch()
    this.getProvider()
    this.getProvider()
    this.getUser()
    this.getArea()
    this.getRecurrentes()

  }

  cambiarEstado(nuevoEstado: string) {
    this.estadoActual = nuevoEstado;
    if (this.estadoActual == 'captura') {
      this.bandera = false
      console.log('bandera verdadera cambio', this.bandera)
    } else {
      this.bandera = true
      console.log('bandera negativa cambio')
    }
    console.log("estado actual >>>>>", this.estadoActual)
  }

  obtenerEstadoActual() {
    if (this.estadoActual == 'gastos') {
      this.bandera = false
      console.log('bandera negativa actual')
    } else {
      this.bandera = true
      console.log('bandera verdadera actual')
    }
    return this.estadoActual;
  }

  estadosTarjetas: { [key: number]: string } = {};

  checker(idGastoRev: number, nuevoEstado: string) {
    this.estadosTarjetas[idGastoRev] = nuevoEstado;
    if (nuevoEstado === 'inactiva') {
      console.log(`La tarjeta con idGastoRev ${idGastoRev} cambió a activa`);
      // const Swa = Swal.mixin({
      //   customClass: {
      //     confirmButton: 'btn btn-success',
      //     cancelButton: 'btn btn-danger'
      //   },
      //   buttonsStyling: false
      // })
      // Swal.fire({
      //   title: 'Are you sure?',
      //   text: "You won't be able to revert this!",
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonText: 'Yes, delete it!',
      //   cancelButtonText: 'No, cancel!',
      //   reverseButtons: true
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     Swal.fire(
      //       'Deleted!',
      //       'Your file has been deleted.',
      //       'success'
      //     ),
      //     console.log(`La tarjeta con idGastoRev ${idGastoRev} cambió a inactiva`);
      //   } else if (
      //     /* Read more about handling dismissals below */
      //     result.dismiss === Swal.DismissReason.cancel
      //   ) {
      //     Swal.fire(
      //       'Cancelled',
      //       'Your imaginary file is safe :)',
      //       'error'
      //     ),
      //     
      //   }
      // })

    } else {
      console.log(`La tarjeta con idGastoRev ${idGastoRev} cambió a inactiva`);
    }
    console.log("Estado actual >>>>>", this.estadosTarjetas[idGastoRev]);
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

  getRecurrentes() {
    this._SERVICE_GASTIS.getRevolvente().subscribe({
      next: (data: any) => {
        this.recurrentes = data as any[]
        setTimeout(() => {
        }, 1000)
      }
    })
  }

  isActived(){
    console.log("A")
  }

  registroPresupuesto() {
    console.log("Usuario : ", sessionStorage.getItem('idUser'))
    console.log(this.captureForm.value)
    this._SERVICE_GASTIS.createRevol(this.captureForm.value).pipe(
      timeout(5000) // 5000 milisegundos = 5 segundos
    ).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Gasto registrado',
          showConfirmButton: false,
          timer: 1500
        });
        this.getRecurrentes()
        this.captureForm = this._formBuider.group({
          empleado: new FormControl('', [Validators.required]),
          area: new FormControl('', [Validators.required]),
          periodo: new FormControl('', [Validators.required]),
          name: new FormControl('', Validators.required),
          branch: new FormControl('', [Validators.required]),
          monto: new FormControl('', [Validators.required]),
          servicio: new FormControl('', [Validators.required]),
          provedor: new FormControl('', [Validators.required]),
        })
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

  onRegisterPresupuesto() {
    console.log(this.captureForm.value)
  }

  onCaptureConcept(selectConcept: Concept) {
    console.log('change', selectConcept)
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
          })
        }
        setTimeout(() => {
        }, 1000)
      }
    })
  }

  getBranch() {
    this.branch.getAll().subscribe({
      next: (data: any) => {
        this.sucursales = data[0] as Sucursal[]
        console.log(this.sucursales)
        setTimeout(() => {
        }, 1000)
      }
    })
  }


  formatMonto(monto: number): string {
    return `$${monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

  formatFecha(fechaISO: string): string {
    const parsedDate = new Date(fechaISO);
    const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    const day = parsedDate.getDate() + 1;
    if (day == 32) {
      const year = parsedDate.getFullYear().toString();
      const monthIndex = parsedDate.getMonth() + 1;
      const monthName = monthNames[monthIndex];
      return `01/${monthName}/${year}`;
    }
    const monthIndex = parsedDate.getMonth();
    const monthName = monthNames[monthIndex];
    const year = parsedDate.getFullYear().toString();
    return `${day}/${monthName}/${year}`;
  }
}
