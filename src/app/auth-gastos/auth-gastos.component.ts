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
  completed: any = 'status completed';
  process: any = 'status process';
  pending: any = 'status pending'

  constructor(
    private util: UtilService,
    private twilio: AuthService,
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
        this.status = data;
      }
    })
  }
  
}
