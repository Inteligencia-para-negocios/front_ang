import { Component, OnInit } from '@angular/core';
import { CorteService } from '../service/corte.service';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recibo-efe-x',
  templateUrl: './recibo-efe-x.component.html',
  styleUrls: ['./recibo-efe-x.component.css']
})
export class ReciboEfeXComponent implements OnInit{

  public chartActyviti: any;
  public corte: any[] = []
  public efeX = []
  isBloqued: any = 'status closed'
  notBloqued: any = 'status open';

  completed: any = 'status open';
  cerrado: any = 'status closed';
  pendiente : any = 'status pendiente'
  pendiente2 : any = 'status pendiente2'
  
  constructor(
    private _CORTE_SERVICE_: CorteService,
    private _ROUTE_ : Router
  ) { }

  ngOnInit(): void {
    this.getCorte()
  }

  getCorte() {
    this._CORTE_SERVICE_.getRecibos().subscribe({
      next: (data: any) => {
        console.log("=>",data)
        this.corte = data
      }
    })
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
 
}