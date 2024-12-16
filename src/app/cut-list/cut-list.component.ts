import { Component, OnInit } from '@angular/core';
import { CorteService } from '../service/corte.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cut-list',
  templateUrl: './cut-list.component.html',
  styleUrls: ['./cut-list.component.css']
})

export class CutListComponent implements OnInit {
  constructor(
    private _SERVICE_CORTE_: CorteService,
    private router:Router
  ) { }
  
  private idCorte: number = 0
  public gastosCortes: any[] = []
  public gastosRespaldo: any[] = []
  public cortes: any[] = []
  public montoTotalCorteParcial!: number | 0;

  ngOnInit(): void {
    this.listCortes()
    this.listCorte()
  }


  formCheque = new FormGroup({
    cheque: new FormControl('')
  })

  setIdCorte(id: number) {
    this.idCorte = id
  }

  getIdCorte() {
    return this.idCorte
  }

  listCortes() {
    this.gastosCortes = this._SERVICE_CORTE_.getCortes();
    console.log("Gasto_LOGX", this.gastosCortes)
    const montoTotal = this.gastosCortes.reduce((total, value) => {
      const efeCo = value.EfeCo;
      // console.log("Gasto comprobado ==>", efeCo );
      return total + efeCo;
    }, 0);
    this.montoTotalCorteParcial = montoTotal
    console.log("Total a liberar =>", this.montoTotalCorteParcial)
  }

  listCorte() {
    this._SERVICE_CORTE_.getAll().pipe(
      // 5000 milisegundos = 5 segundos
    ).subscribe(
      (response) => {
        this.cortes = response as any[]
        console.log("Cortes", this.cortes)
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onChangeResp(resp: number) {
    console.log(": : : : : : ", resp)
    this.setIdCorte(resp)
    const chequeson = {
      'id': resp
    }
    // this.descuentoCorte()
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Se va descontar el corte parcial',
      text: "",
      showConfirmButton: false,
      timer: 3000
    });
  }

  formatMonto(monto: number): string {
    return `$${monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

  formatFecha(fechaISO: string): string {
    const parsedDate = new Date(fechaISO);
    const day = parsedDate.getUTCDate().toString().padStart(2, '0');
    const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    const monthIndex = parsedDate.getUTCMonth();
    const monthName = monthNames[monthIndex];
    const year = parsedDate.getUTCFullYear().toString();
    return `${day}/${monthName}/${year}`;
  }

  verifyCorte(){

  }

  descuentoCorte() {
    if (this.getIdCorte() == 0) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'No ha seleccionado ningun corte global',
        text: "selecciona un corte global!",
        showConfirmButton: false,
        timer: 3000
      })
    } else {
      const ajuste = {
        idCorte: this.getIdCorte(),
        id: this._SERVICE_CORTE_.getIdNumCorte(),
        monto: this.montoTotalCorteParcial
      }
      console.log("Descuento de corte===>>>",ajuste)
      this._SERVICE_CORTE_.ajusteCorte(ajuste).pipe().subscribe({
        next: (data) => {
          console.table(data)
          this.router.navigate(['cortes-parciales'])
        }
      })
    }
  }
}
