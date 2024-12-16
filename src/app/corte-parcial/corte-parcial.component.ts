import { Component, OnInit } from '@angular/core';
import { ReporteGastos } from 'src/models/interface';
import { CorteService } from '../service/corte.service';
import { ReporteService } from '../service/reporte.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-corte-parcial',
  templateUrl: './corte-parcial.component.html',
  styleUrls: ['./corte-parcial.component.css']
})


export class CorteParcialComponent implements OnInit {
  public idUser = localStorage.getItem('idUser')
  public corteParcial: ReporteGastos[] = []
  public cortes: any[] = []
  public monto: any[] = []
  public id = 0
  constructor(
    private _SERVICE_CORTE_: CorteService,
    private gastos: ReporteService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getListCorte()
    this.getMonto()
  }

 
  // listCorteRedirecTo(id: number) {
  //   this.getListCorteDetalle(id)
  //   console.log("redireccionando perro", id)
  //   this.router.navigate(['listcut'])

  // }

  // getListCorteDetalle(id: number) {
  //   console.log("listado de gastos comprobados")
  //   this._SERVICE_CORTE_.getListCorteDetalle(id).subscribe({
  //     next: (data: any) => {
  //       this.cortes = data as any[]
  //       this._SERVICE_CORTE_.setCortes(data)
  //       console.log("Listado de cortes", this._SERVICE_CORTE_.getCortes())
  //     }
  //   })
  // }

  listCorteRedirecTo(id: number) {
    // console.log("gege",id)
    this._SERVICE_CORTE_.setIdNumCorte(id)
    this.getListCorteDetalle(id).subscribe(() => {
      console.log("redireccionando perro", id);
      this.router.navigate(['listcut']);
    });
  }

  getListCorteDetalle(id: number) {
    console.log("listado de gastos comprobados");
    return this._SERVICE_CORTE_.getListCorteDetalle(id).pipe(
      map((data: any) => {
        this.cortes = data as any[];
        this._SERVICE_CORTE_.setCortes(data);
        console.log("Listado de cortes", this._SERVICE_CORTE_.getCortes());
      })
    );
  }

    getListCorte() {
      console.log("listado de gastos comprobados")
      this._SERVICE_CORTE_.getListCorteP(this.idUser).subscribe({
        next: (data: any) => {
          this.cortes = data as any[]
          console.log("Listado de cortes 23", this.cortes)
        }
      })
    }

    getMonto(){
      this.gastos.getMonto(this.idUser).subscribe({
        next: (data: any) => {
          this.monto = data as any
          console.log("totales", this.monto)
        }
      })
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


 
  }
