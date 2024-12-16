import { Component } from '@angular/core';
import { CapChequeService } from '../service/cap-cheque.service';
import { Cheque } from 'src/models/interface';
import Swal from 'sweetalert2';
import { timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ReporteService } from '../service/reporte.service';
import { UtilService } from '../service/util.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-view-cheques',
  templateUrl: './view-cheques.component.html',
  styleUrls: ['./view-cheques.component.css']
})
export class ViewChequesComponent {

  selectFolio: number | undefined

  constructor(
    private _CHEQUE_SERVICE: CapChequeService,
    private router: Router,
    private gastos: ReporteService,
    private utilG: UtilService
  ) { }

  completed: any = 'status open';
  cerrado: any = 'status closed';
  pendiente : any = 'status pendiente'
  pendiente2 : any = 'status pendiente2'

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
    const day = parsedDate.getDate().toString().padStart(2, '0') ;
    const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    const monthIndex = parsedDate.getMonth();
    const monthName = monthNames[monthIndex];
    const year = parsedDate.getFullYear().toString();
    return `${day}/${monthName}/${year}`;
  }
  
  getC() {
    console.log('dd', this.cheques);
    console.log(this.cheques)
    this._CHEQUE_SERVICE.getAll().pipe(
      timeout(5000) // 5000 milisegundos = 5 segundos
    ).subscribe(
      (response) => {
        this.cheques = response as Cheque[]
        console.log("Cheques", this.cheques)
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Data extraida correctamente',
          showConfirmButton: false,
          timer: 3000
        });
      },
      (error) => {
        console.log(error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: error.error.mesagge,
          showConfirmButton: false,
          timer: 3000
        });
      }
    );
  }
  async edit(folio: number) {
    this.selectFolio = folio
    const chequeSelect = {
      'id': this.selectFolio
    }
    console.log("Folio seleccionado: ", this.selectFolio)
    try {
      this._CHEQUE_SERVICE.getById(chequeSelect).subscribe(
        (response) => {
          console.log('::gastos segun el cheque seleccionado ::::::')
          this._CHEQUE_SERVICE.setGastos(response)
          console.log(response)
          this.router.navigate(['/gastos-comprobados'])
        },
        (error) => {
            console.log(error)
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Espera!',
              text: error.error.message,
              showConfirmButton: false,
              timer: 3000
            });
        })
    } catch (error) {
      console.log(error)
    }

    // }
  }
}
