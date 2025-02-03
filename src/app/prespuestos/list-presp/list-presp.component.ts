import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PresupuestoService } from 'src/app/service/presupuesto.service';
import { UtilService } from 'src/app/service/util.service';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-list-presp',
  templateUrl: './list-presp.component.html',
  styleUrls: ['./list-presp.component.css']
})
export class ListPrespComponent implements OnInit{
  public status: any[] = []
  completed: any = 'status open';
  rechaced: any = 'status closed';
  pending: any = 'status pending'

  selectFolio: number | undefined
  notCompleted: any = 'not-completed'
  public reportes: any[] = []
  public presupuestos: any[] = []
  public pages: any;
  celular: any;
  
  constructor(private _presp : PresupuestoService, public _util: UtilService,   private twilio: AuthService
  ){}
  estadoActual: string = 'PENDIENTE'; // Estado inicial, puedes cambiarlo según tus necesidades
  bandera: boolean | undefined

  auth = new FormGroup({
    status: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
  })


  ngOnInit(): void {
    this.getAllSolicitudes()
    this.getSolicitudesX()
  }
  sendCodeAndReturnPromise(century: any) {
    return new Promise((resolve, reject) => {
      this.twilio.sendCodeTwilio(century).pipe().subscribe({
        next: (data: any) => {
          this.celular = data as any;
          console.log("data ::: ", data);
          resolve(this.celular); // Resolvemos la Promesa con el valor de this.celular
        },
        error: (error: any) => {
          reject(error); // Rechazamos la Promesa en caso de error
        }
      });
    });
  }

  filtroForm = new FormGroup({
    filtro: new FormControl('')
  })


  changeEstatus(estatus: string){
    console.log(estatus)
  }
    
  onChangeEstatus(idEstatus:any,selectedEstatus: any) {
    let objeto = {
      id: idEstatus,
      estatus: selectedEstatus
    }
    console.log("Estatus",objeto)
    this._presp.updateDetalle(objeto).pipe().subscribe({
        next: (data: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            background: "#d6ede2",
            title: data.message,
            showConfirmButton: false,
            timer: 2500
          });
          console.log(data.message);
          // resolve("TE DOY PURA VRGA"); // Resolvemos la Promesa con el valor de this.celular
        },
        error: (error: any) => {
          Swal.fire({
            position: 'top-right',
            background: '#f5dcdc',
            title: error.error.message,
            showConfirmButton: false,
            timer: 2500
          });
          console.log(error.error.message)
          // reject(error); // Rechazamos la Promesa en caso de error
        }
      });
  
  }



  cambiarEstado(nuevoEstado: string) {
    this.estadoActual = nuevoEstado;
    if (this.estadoActual === 'PENDIENTE') {
      this.bandera = false;
      // this.getGastos();
      console.log('bandera verdadera cambio', this.bandera);
      // } else if (this.estadoActual === 'revolvente') {
      //   this.bandera = true;
      //   console.log('bandera revolvente cambio');
      //   // this.listaRevolvente()
      }
      else {
        this.bandera = true;
        console.log('bandera negativa cambio');
        // this.listGasComp();
      }
      console.log("usuario ->", this.estadoActual);
    }

    obtenerEstadoActual() {
      if (this.estadoActual === 'AUTORIZADO') {
        this.bandera = false;
        console.log('bandera autorizados falsa actual');
      } else {
        this.bandera = true;
        console.log('bandera autorizados verdadera actual');
      }
      return this.estadoActual;
    }
    loading: boolean = false;

    async getSolicitudesX(){
      console.log("Filtro por solicitudes de estatus ----->",this.estadoActual)
    }

    async getAllSolicitudes() {
      this.loading = true;  // Setea el loader a true cuando inicie la solicitud
      this._presp.getList().subscribe({
        next: (data: any) => {
          this.presupuestos = data;
          this.pages = this.presupuestos.length;
          console.log(this.presupuestos);
        },
        complete: () => {
          this.loading = false;  
          console.log(this.loading)
        },
        error: () => {
          this.loading = false;  // Si ocurre un error, también se apaga el loader
          console.log(this.loading)
        }
      });
    }

    async edit(folio: number) {
      this.selectFolio = folio
      console.log("Folio seleccionado: ", this.selectFolio)
      if (this.selectFolio) {
      }
    }
      

}
