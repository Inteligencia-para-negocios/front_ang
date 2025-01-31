import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NativeDateAdapter} from '@angular/material/core';
import { PresupuestoService } from 'src/app/service/presupuesto.service';
import { UtilService } from 'src/app/service/util.service';
@Component({
  selector: 'app-list-presp',
  templateUrl: './list-presp.component.html',
  styleUrls: ['./list-presp.component.css']
})
export class ListPrespComponent implements OnInit{

  completed: any = 'status completed';
  process: any = 'status process';
  pending: any = 'status pending'
  selectFolio: number | undefined
  notCompleted: any = 'not-completed'

  public reportes: any[] = []
  public presupuestos: any[] = []
  public pages: any;
  
  constructor(private _presp : PresupuestoService, public _util: UtilService){}
  estadoActual: string = 'pendiente'; // Estado inicial, puedes cambiarlo según tus necesidades
  bandera: boolean | undefined

  ngOnInit(): void {
    this.getAllSolicitudes()
  }

  filtroForm = new FormGroup({
    filtro: new FormControl('')
  })
  

    cambiarEstado(nuevoEstado: string) {
      this.estadoActual = nuevoEstado;
      if (this.estadoActual === 'pendiente') {
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
      if (this.estadoActual === 'autorizados') {
        this.bandera = false;
        console.log('bandera autorizados falsa actual');
      } else {
        this.bandera = true;
        console.log('bandera autorizados verdadera actual');
      }
      return this.estadoActual;
    }
    loading: boolean = false;

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
        },
        error: () => {
          this.loading = false;  // Si ocurre un error, también se apaga el loader
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
