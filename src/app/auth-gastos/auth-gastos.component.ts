import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilService } from '../service/util.service';
import { SolicitudService } from '../service/solicitud.service';
import { GastoService } from '../service/gasto.service';
import { HandlerService } from '../service/handler.service';
import { GastoRecurrenteService } from '../service/gasto-recurrente.service';

@Component({
  selector: 'app-auth-gastos',
  templateUrl: './auth-gastos.component.html',
  styleUrls: ['./auth-gastos.component.css']
})
export class AuthGastosComponent implements OnInit {

  public solicitudes: any[] = []
  public status: any[] = []

  constructor(
    private util: UtilService,
    private solicitud: SolicitudService,
    private gasto: GastoService,
    private handler: HandlerService,
    private gastoRecu: GastoRecurrenteService
  ) { }

  ngOnInit(): void {
    this.getSolicitudes()
    this.getEstatus()
  }

  getSolicitudes() {
    this.solicitud.getSolicitudes().subscribe({
      next: (data: any) => { this.solicitudes = data; }
    })
  }

  getEstatus(){
    this.util.getEstatusSolicitud().subscribe({
      next: (data: any) => { this.status = data; }
    })
  }
  
  onChangeStatus(event: Event, solicitud: any): void {
    const selectElement = event.target as HTMLSelectElement;
    const select = this.status.find(st => st.idCatalogo === selectElement.value);
    const obj = { "idSolicitud":solicitud.idSolicitud, "estatus":selectElement.value } 
    if (select.nombre === "AUTORIZADO") {
      this.solicitud.authSolicitud(obj).subscribe({
        next: (data: any) => { 
          this.handler.handleSuccess();
          this.gasto.createGasto({"solicitud": solicitud.idSolicitud}).subscribe({
            next: (data: any) => {
              if(solicitud.tipo=="RECURRENTE")
              {
                const gastoRecurrente = {
                  "idGasto":data, 
                  "fechaInicio":solicitud.fechaInicio, 
                  "fechaLimite":solicitud.fechaLimite, 
                  "periodo":solicitud.periodo
                }
                this.gastoRecu.createGasto(gastoRecurrente).subscribe({})
              }
            }
          })
        },
        error: () => { this.handler.handleError(); }
      });
    }else
      this.solicitud.updateSolicitud(obj).subscribe({
        next: () => { this.handler.handleSuccess();},
        error: () => { this.handler.handleError(); }
    });
    this.getSolicitudes()
  }
}
