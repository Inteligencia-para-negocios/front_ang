import { Component, OnInit } from '@angular/core';
import { CapChequeService } from '../service/cap-cheque.service';
import { Router } from '@angular/router';
import { ReporteService } from '../service/reporte.service';
import { UtilService } from '../service/util.service';
import { Cheque, ReporteGastos } from 'src/models/interface';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent implements OnInit {
  selectFolio: number | undefined
  formCheque = new FormGroup({
    cheque: new FormControl('')
  })
  constructor(
    private _CHEQUE_SERVICE: CapChequeService,
    private router: Router,
    private gastos: ReporteService,
    private utilG: UtilService
  ) { }

  completed: any = 'status open';
  cerrado: any = 'status closed';
  pendiente: any = 'status pendiente'
  pendiente2: any = 'status pendiente2'
  public gastosComp: ReporteGastos[] = []
  montos: number[] = [];

  public cheques: any[] = []

  ngOnInit(): void {
    // this.getCheque()
    this.getC()
  }

  formatMonto(monto: number): string {
    return `$${monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

  formatFecha(fechaISO: string): string {
    const parsedDate = new Date(fechaISO);
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    const monthIndex = parsedDate.getMonth();
    const monthName = monthNames[monthIndex];
    const year = parsedDate.getFullYear().toString();
    return `${day}/${monthName}/${year}`;
  }

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

  onChangeResp(resp: string) {
    console.log(": : : : : : ", resp)
    const chequeson = {
      'id': resp
    }

    this._CHEQUE_SERVICE.getById(chequeson).subscribe(
      (response) => {
        // console.log("respuesta : =>", response)
        // this.gastosComp = response as any[]
        // console.log("Cheques", this.gastosComp)
        //this.getMontos()  
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

  revisado(id: number) {
    //console.log("ya lo revise", id)
    const cheque = {
      id: id
    }
    this._CHEQUE_SERVICE.revisionContabilidad(cheque).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El cheque cerrado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 4000,
        })
        location.reload()
      })
    
  }

  getC() {
    this._CHEQUE_SERVICE.getContabilidad().subscribe((response) => {
      //console.log(response)
      this.cheques = response
      if (!response) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No hay ningun cheque en fila para cerrar',
          text: '',
          showConfirmButton: false,
          timer: 3000
        });
      }
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
      })
  }
}
