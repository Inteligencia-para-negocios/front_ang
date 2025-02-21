import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { UtilService } from '../service/util.service';
import { Status } from 'src/models/interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { SolicitudService } from '../service/solicitud.service';

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
    private solicitud: SolicitudService
  ) { }

  ngOnInit(): void {
    this.getSolicitudes()
    this.getEstatus()
  }

  getSolicitudes() {
    this.solicitud.getSolicitudes().subscribe({
      next: (data: any) => {
        this.solicitudes = data;
      }
    })
  }

  getEstatus(){
    this.util.getEstatus().subscribe({
      next: (data: any) => {
        this.status = [];
        this.status = data;
      }
    })
  }
  
  onChangeStatus(event: Event, id: string): void {
    const selectElement = event.target as HTMLSelectElement;
    const nuevoStatus = selectElement.value;
    const select = this.status.find(st => st.idCatalogo === nuevoStatus);
    const obj = { "idSolicitud":id, "estatus":nuevoStatus }
    if (select.nombre === "AUTORIZADO") 
      this.solicitud.authSolicitud(obj).subscribe({
    });
    else
      this.solicitud.updateSolicitud(obj).subscribe({
    });
    this.getEstatus()
  }

}
