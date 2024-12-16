import { Component, OnInit } from '@angular/core';
import { CorteService } from '../service/corte.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-efex',
  templateUrl: './detalle-efex.component.html',
  styleUrls: ['./detalle-efex.component.css'],
})
export class DetalleEfexComponent implements OnInit {
  public corte: any[] = [];
  public detalleEfx: any[] = [];
  public ajusteCorte: any[] = []
  public ajusteTesoreria: any[] = []
  public monto = 0;
  public montoAjuste = 0;
  public idCorte = 0;
  public montoResta = 0;
  public montoCorteParcial = 0;
  usuarioOn: String | null | undefined
  role: string | null | undefined;

  notBloqued: any = 'status completed';
  process: any = 'status process';
  isBloqued: any = 'status closed';
  completed: any = 'status completed';
  pending: any = 'status pending';
  formCorte = new FormGroup({
    corte: new FormControl(''),
  });

  constructor(private _CORTE_SERVICE_: CorteService) { }

  ngOnInit() {
    this.getCorte();
  }

  getCorte() {
    this._CORTE_SERVICE_.getAll().subscribe({
      next: (data: any) => {
        console.log(data);
        this.corte = data;
      },
    });
  }

  async getDetalleEfex(id: number) {
    this.monto = 0;
    this.montoAjuste = 0;
    this.montoResta = 0;
    this.montoCorteParcial = 0;
    this.ajusteTesoreria = []
    this.idCorte = id
    const bodyCorte = {
      id: id,
    };
    this._CORTE_SERVICE_.detalleajusteCorte(bodyCorte).subscribe({
      next: (data: any) => {
        console.log('Ajustes =>', data);
        this.ajusteCorte = data;
        // console.log(data)
        this.monto = data[0]['efectivoX']
        const montoSumaCP = this.ajusteCorte.reduce((total, value) => {
          const suma = value.montoCorteParcial;
          return total + suma;
        }, 0);
        this.montoCorteParcial = montoSumaCP
        console.log("Corte parcial =>", this.montoCorteParcial)
        // Asigna los detalles a la propiedad detalleEfx
      },
    });
    this.getDetallesTesoreria(bodyCorte)
    this.getAjusteCorte(bodyCorte);
  }
  // Esta función se encarga de formatear el monto en la vista
  formatMonto(monto: number): string {
    return `$${monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }


  async getAjusteCorte(objet: any) {
    this._CORTE_SERVICE_.detalleX(objet).subscribe({
      next: (data: any) => {
        console.log('Desglose =>', data);
        const montoTotal = this.ajusteTesoreria.reduce((total, value) => {
          const ajuste = value.monto;
          return total + ajuste;
        }, 0);
        // Asigna los detalles a la propiedad detalleEfx
        this.detalleEfx = data; // Asegúrate de que los detalles se carguen correctamente
        this.montoResta = montoTotal
        console.log(montoTotal)
      },
    });
  }

  getDetallesTesoreria(id: any) {
    this._CORTE_SERVICE_.getDetalleTesoreria(id).subscribe({
      next: (data: any) => {
        console.log('Ajustes Tesoreria=>', data);
        this.ajusteTesoreria = data;
        this.monto = data[0]['EfectivoX']
        const montoAjuste = this.ajusteTesoreria.reduce((total, value) => {
          const ajuste = value.monto;
          return total + ajuste;
        }, 0);
        this.montoAjuste = montoAjuste
        // Asigna los detalles a la propiedad detaleEfx    
        //  console.log(data) // Asegúrate de que los detalles se carguen correctamente
      }
    })
  }

  detectUser() {
    const amount = (this.monto - this.montoResta - this.montoCorteParcial)
    this.usuarioOn = sessionStorage.getItem('usuario') || localStorage.getItem('usuario')
    this.role = sessionStorage.getItem('rol') || localStorage.getItem('rol')
    if (this.role == 'contralor') {
      const entregaCorte = {
        idCorteG: this.idCorte,
        contralor: localStorage.getItem('idUser'),
        monto: amount
      }
      console.log('es contralor')
      this._CORTE_SERVICE_.entregas(entregaCorte).subscribe({
        next: (data: any) => {
          console.log(data) // Asegúrate de que los detalles se carguen correctamente
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Entrega de corte",
            text: "Se realizo correctamente la entrega del corte general",
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
    } else if (this.role == 'administrador') {
      console.log("es administrador")
      const entregaCorte = {
        idCorteG: this.idCorte,
        administrador: localStorage.getItem('idUser'),
        monto: amount
      }
      this._CORTE_SERVICE_.entregas(entregaCorte).subscribe({
        next: (data: any) => {
          console.log(data) // Asegúrate de que los detalles se carguen correctamente
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Entrega de corte",
            text: "Se realizo correctamente la entrega del corte general",
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
    } else if (this.role == 'tesoreria') {
      const entregaCorte = {
        idCorteG: this.idCorte,
        tesoreria: localStorage.getItem('idUser'),
        monto: amount
      }
      console.log("es tesorero")
      this._CORTE_SERVICE_.entregas(entregaCorte).subscribe({
        next: (data: any) => {
          console.log(data) // Asegúrate de que los detalles se carguen correctamente
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Entrega de corte",
            text: "Se realizo correctamente la entrega del corte general",
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
    }
  }

  // Esta función se encarga de formatear la fecha en la vista
  formatFecha(fechaISO: string): string {
    const parsedDate = new Date(fechaISO);
    const day = parsedDate.getUTCDate().toString().padStart(2, '0');
    const monthNames = [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ];
    const monthIndex = parsedDate.getUTCMonth();
    const monthName = monthNames[monthIndex];
    const year = parsedDate.getUTCFullYear().toString();
    return `${day}/${monthName}/${year}`;
  }


  entrega() {
    const hugo = false
    const tesoreria = true
    const contralor = true
    const admin = true

  }
}
