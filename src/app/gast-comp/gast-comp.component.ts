import { Component, OnInit } from '@angular/core';
import { Cheque, ReporteGastos } from 'src/models/interface';
import { CapChequeService } from '../service/cap-cheque.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gast-comp',
  templateUrl: './gast-comp.component.html',
  styleUrls: ['./gast-comp.component.css']
})
export class GastCompComponent implements OnInit {
  cheques: any[] = []
  // totalesComprobados : any [] = []
  constructor(
    private CHEQUE: CapChequeService
  ) { }


  formCheque = new FormGroup({
    cheque: new FormControl('')
  })

  bandera: boolean | true | undefined
  montos: number[] = [];
  remanente: number | undefined;
  montoCheque: number | undefined;
  efeCo: number | undefined;
  folios: string[] = []

  completed: any = 'status completed';
  process: any = 'status process';
  pending: any = 'status pending'

  public gastosComp: ReporteGastos[] = []

  ngOnInit() {
    this.getC()
    // this.gastosComp = this.CHEQUE.getGastos();
    console.log("<><<><>", this.gastosComp)

    //Comprobacion de rol para mostrar el boton de contabilidad en dado caso pueda visualizarlo
    if (localStorage.getItem('rol') === 'contabilidad' || sessionStorage.getItem('rol') == 'contabilidad' || localStorage.getItem('rol') === 'visualizador' || sessionStorage.getItem('rol') == 'visualizador' ) {
      //en el boton en html evaluamos una variable boleana la cual oculta el boton de dado caso sea verdadera la exprecion de  arriba
      //esta toma el valor de false para poder desaparecer el boton.
      this.bandera = true
      console.log("no se que pedo")

    } else {
      //en dado caso no cumpla con el rol establecido en la exprecion tomara un estado verdadero lo cual dara lugar a mostrar el boton.
      this.bandera = false
    }
  }



  public idCheque: any
  entregaContabilidad() {

    const cheque = {
      id: this.idCheque
    }
    this.CHEQUE.entregaContabilidad(cheque).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'El cheque se ha mandado a contabilidad a espera de cierre',
          showConfirmButton: false,
          timer: 3000
        });
      }
    )

  }
  // getMontos() {
  //   this.montos = []
  //   if(this.gastosComp){
  //     const montoTotal = this.gastosComp.reduce((total, value) => {
  //       const efeCo = value.EfeCo;
  //       console.log("Gasto comprobado ==>", efeCo);
  //       return total + efeCo;
  //     }, 0);
  //     console.log("Monto total de efeCo:", montoTotal);
  //     this.montos.push(montoTotal)
  //   }else{
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'info',
  //       title: 'Seleccione un folio',
  //       text: "se mostrara la informacion cuando seleccione un folio",
  //       showConfirmButton: false,
  //       timer: 3000
  //     });
  //   }
  // }





  getMontos() {
    if (this.gastosComp) {
      const montoTotal = this.gastosComp.reduce((total, value) => {
        const efeCo = value.EfeCo;
        const montoCheck = value.amount
        const remanente = value.remanente
        console.log("Gasto comprobado ==>", efeCo, '/n', "Monto cheque:", montoCheck, "Remanente :", remanente);
        return total + efeCo;
      }, 0);
      console.log("Monto total de efeCo:", montoTotal);
      this.montos = [montoTotal];
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

  getEfeCo() {
    this.montos.forEach(function (value) {
      console.log("<<<<<", value)
    })
  }

  getC() {
    console.log('dd', this.cheques);
    console.log(this.cheques)
    this.CHEQUE.getAll().pipe(
      // 5000 milisegundos = 5 segundos
    ).subscribe(
      (response) => {
        //filtrar solo cheques que no hayan sido cerrados por contabilidad
        console.table(response)
        this.cheques = response as any[]
        console.log("Cheques", this.cheques)
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onChangeResp(resp: string) {
    console.log(": : : : : : ", resp)
    this.idCheque = resp
    const chequeson = {
      'id': resp
    }

    this.CHEQUE.getById(chequeson).subscribe(
      (response) => {
        console.log("respuesta : =>", response)
        this.gastosComp = response as any[]
        console.log("Cheques", this.gastosComp)
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
}
