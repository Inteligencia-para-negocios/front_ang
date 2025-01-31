import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from '../service/reporte.service';
import { ReporteGastos } from 'src/models/interface';
import { UtilService } from '../service/util.service';
import Swal from 'sweetalert2';
import { CorteService } from '../service/corte.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CapChequeService } from '../service/cap-cheque.service';
@Component({
  selector: 'app-view-gastos',
  templateUrl: './view-gastos.component.html',
  styleUrls: ['./view-gastos.component.css']
})

export class ViewGastosComponent implements OnInit {

  constructor(
    private router: Router,
    private gastos: ReporteService,
    private utilG: UtilService,
    private cortePar: CorteService,
    private CHEQUE: CapChequeService

  ) { }

  filtroForm = new FormGroup({
    filtro: new FormControl('')
  })

  public idUser = localStorage.getItem('idUser') || sessionStorage.getItem('idUser')
  public usuario = localStorage.getItem('usuario') || sessionStorage.getItem('usuario')
  estadoActual: string = 'pendiente'; // Estado inicial, puedes cambiarlo según tus necesidades
  bandera: boolean | undefined
  cheques: any[] = []
  public remanente: any
  public remanenteResta: any


  public idCheque: any

  completed: any = 'status completed';
  process: any = 'status process';
  pending: any = 'status pending'
  selectFolio: number | undefined
  notCompleted: any = 'not-completed'

  public reportes: ReporteGastos[] = []

  public corteParcial: ReporteGastos[] = []
  public monto: any

  ngOnInit(): void {
    this.getGastos()
    console.log(this.idUser)
    this.getMonto()
    this.getC()
    console.log(this.usuario)

  }

  getC() {
    console.log('dd', this.cheques);
    console.log(this.cheques)
    const usuario = {
      usuario: this.usuario
    }

    this.CHEQUE.getChUser(usuario).pipe(
      // 5000 milisegundos = 5 segundos
    ).subscribe(
      (response) => {
        this.cheques = response as any[]
        console.log("Cheques", this.cheques)
      },
      (error) => {
        console.log(error)
      }
    );
  }
  
  cambiarEstado(nuevoEstado: string) {
    this.estadoActual = nuevoEstado;
    if (this.estadoActual === 'pendiente') {
      this.bandera = false;
      this.getGastos();
      console.log('bandera verdadera cambio', this.bandera);
    } else if (this.estadoActual === 'revolvente') {
      this.bandera = true;
      console.log('bandera revolvente cambio');
      this.listaRevolvente() // Supongo que existe una función similar para los gastos revolventes
    } else {
      this.bandera = true;
      console.log('bandera negativa cambio');
      this.listGasComp();
    }
    console.log("usuario ->", this.estadoActual);
  }

  obtenerEstadoActual() {
    if (this.estadoActual === 'liberado') {
      this.bandera = false;
      console.log('bandera negativa actual');
    } else {
      this.bandera = true;
      console.log('bandera verdadera actual');
    }
    return this.estadoActual;
  }

  async edit(folio: number) {
    this.selectFolio = folio
    console.log("Folio seleccionado: ", this.selectFolio)
    if (this.selectFolio) {
      this.gastos.getId(this.selectFolio).subscribe({
        next: (data: any) => {
          console.log('::::::::::::::update gasto')
          this.utilG.setGasto(data);
          console.log(data)
          if (data[0]['Comprobado'] == 'COMPROBADO') {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ya ha sido comprobado',
              text: 'Si tienes un problema comunicalo con el equipo de soporte!',
              showConfirmButton: false,
              timer: 2500
            });
          } else {
            if (data[0]['Autorizado'] == 'APROBADO') {
              console.log('si esta autorizado')
              this.router.navigate(['/edit']);
            } else {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No ha sido autorizado este gasto',
                text: 'Reviza el estatus de tus gastos',
                showConfirmButton: false,
                timer: 2000
              });
            }
          }

        }
      })
    }
  }
  //consulta de visualizacion de gastos con estado de efectivo liberado para su comprobacion de efectivo
  //solo los que esten con el estatus de liberados podran ser accesados para comprobar los gastos
  // consulta
  // resutlado
  // filtraremos los gastos autorizados para ser comprobados
  // esto lo sabremos porque para estar liberado tiene que estar aprobado, por lo tanto
  // tendremos 3 estados en el cambio de estatus de los cambios del gasto generado
  getGastos() {
    this.gastos.getAll(this.idUser).subscribe({
      next: (data: any) => {
        this.reportes = data as ReporteGastos[]
      }
    })
  }

  listGasComp() {
    console.log("listado de gastos comprobados")
    this.gastos.getAllC(this.idUser).subscribe({
      next: (data: any) => {
        this.reportes = data as ReporteGastos[]
        console.log("gastos comprobados", this.reportes)
      }
    })
  }

  listaRevolvente() {
    console.log("listado de gastos revovlentes comprobados")
    this.gastos.getAllRevolventes(this.idUser).subscribe({
      next: (data: any) => {
        this.reportes = data as ReporteGastos[]
        console.log("Gastos revolventes:  ", this.reportes)
      }
    })
  }

  reloadPage(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  genCorteParcial() {
    this.cortePar.createCorteParcial(this.idUser).subscribe({
      next: (data: any) => {
        console.log("Corte parcial:  ", data)
        if (data == 'OK') {
          Swal.fire({
            icon: 'success'
          })
        }
        this.reloadPage()
      }
    })
  }

  getMonto() {
    this.gastos.getMonto(this.idUser).subscribe({
      next: (data: any) => {
        this.monto = data as any
        console.log("totales", this.monto)
      }
    })
  }
  montos: any

  getMontos() {
    if (this.reportes) {
      const montoTotal = this.reportes.reduce((total, value) => {
        const efeCo = value.EfeCo;
        const montoCheck = value.amount
        const remanente = value.remanente
        this.remanente = remanente
        this.remanenteResta = montoCheck
        console.log("Gasto comprobado ==>", efeCo, '/n', "Monto cheque:", montoCheck, "Remanente :", remanente);
        return total + efeCo;
      }, 0);
      console.log("Monto total de efeCo:", montoTotal);
      this.montos = [montoTotal];

      console.log("Comprobado ===> ", this.montos)
      console.log("Remanente ===> ", this.remanente)

    } else {
      this.montos = [];
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Seleccione un folio',
        text: "se mostrará la información cuando seleccione un folio",
        showConfirmButton: false,
        timer: 3000
      });
    }
  }
  public gastosComp: ReporteGastos[] = []

  onChangeResp(resp: string) {
    this.idCheque = resp
    console.log(": : : : : : ", resp)
    const chequeson = {
      'id': resp
    }
    this.CHEQUE.getById(chequeson).subscribe(
      (response) => {
        console.table(response)
        this.reportes = response as any[]
        this.getMontos()

      },
      (error) => {
        this.montos = []
        console.log("no hay")
        console.log(error)
        this.gastosComp = []
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Gastos sin comprobar',
          text: error.error.message,
          showConfirmButton: false,
          timer: 3000
        });
      }
    )

  }

  //en esta funcion mandaremos los gastos a comprobacion y por lo tanto generara una lista de gastos al cheque
  // que seleccione para que pueda tener una logistica implementada de mejor manera
  entregaComprobados() {
    console.log(this.idCheque)
    const body = {
      id: this.idCheque
    }
    this.CHEQUE.entrega(body).subscribe(
      (response) => {
        console.log(response)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cheque entregado',
          text: "en espera de que sea cerrado",
          showConfirmButton: false,
          timer: 3000
        });
      },
      (error) => {
        this.montos = []
        console.log("no hay")
        console.log(error)
        this.gastosComp = []
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo hacer la entrega',
          text: 'Contactar al equipo de sistemas',
          showConfirmButton: false,
          timer: 3000
        });
      }
    )
    console.table(body)
  }
}

