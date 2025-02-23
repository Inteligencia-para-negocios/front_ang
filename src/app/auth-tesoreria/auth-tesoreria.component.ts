import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteGastos, Status } from 'src/models/interface';
import { UtilService } from '../service/util.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReporteService } from '../service/reporte.service';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';
import { GastoService } from '../service/gasto.service';

@Component({
  selector: 'app-auth-tesoreria',
  templateUrl: './auth-tesoreria.component.html',
  styleUrls: ['./auth-tesoreria.component.css']
})
export class AuthTesoreriaComponent {

  completed: any = 'status completed';
  process: any = 'status process';
  pending: any = 'status pending'
  public reportes: ReporteGastos[] = []
  public celular: any
  private data: any;
  public gastos: any;


  notCompleted: any = 'not-completed'
  public status: Status[] = []
  constructor(
    private util: UtilService,
    private gastosService: GastoService,
    private twilio: AuthService
  ) { }

  auth = new FormGroup({
    status: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
  })

  ngOnInit(): void {
    this.getGastos()
  }

  onChangeSucursal(selectedSucursal: string) {
    console.log(selectedSucursal)
    if (selectedSucursal == 'LIBERADO') {
      alert("El gasto ha sido aprobado y tendra seguimiento en tesoreria")
    }
  }

  getArea() {
    this.util.getStatus1().subscribe({
      next: (data: any) => {
        this.status = data as Status[]
        console.log(this.status)
      }
    })
  }


  getGastos() {
    this.gastosService.getGastos().subscribe({
      next: (data: any) => {
        this.gastos = data;
        console.log(data);
        
      }
    })
  }

  liberacion(obj:any){
    const dato = {id: obj.idGasto}
    console.log(dato);
    this.gastosService.authGasto(dato).subscribe({})
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

  // Luego, puedes llamar a la función y usar la Promesa para acceder a this.celular

  


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
}
