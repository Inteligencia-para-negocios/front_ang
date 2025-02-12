import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClassificationService } from '../service/classification.service';
import { UtilService } from '../service/util.service';
import { UserService } from '../service/user.service';
import { HandlerService } from '../service/handler.service';
import { SolicitudService } from '../service/solicitud.service';

@Component({
  selector: 'app-solicitud-gasto',
  templateUrl: './solicitud-gasto.component.html',
  styleUrls: ['./solicitud-gasto.component.css'],
})
export class SolicitudGastoComponent implements OnInit {

  public presupuestos: any[] = [];
  public partidas: any[] = [];
  public clasificaciones: any[] = [];
  public tipoGastos: any[] = [];
  public proveedores: any[] = [];
  
  public captureForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private classificationService: ClassificationService,
    private utilService: UtilService,
    private userService: UserService,
    private handler: HandlerService,
    private solicService: SolicitudService
  ) { 
    this.captureForm = this._formBuilder.group({
      empresa: [{ value: '', disabled: true }, Validators.required],
      area: [{ value: '', disabled: true }, Validators.required],
      encargado: [{ value: '', disabled: true }, Validators.required],
      presupuesto: ['', Validators.required],
      partida: ['', Validators.required],
      clasificacion: ['', Validators.required],
      monto: ['', Validators.required],
      tipoGasto: ['', Validators.required],
      proveedor: ['', Validators.required],
      justificacion: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.getDatosEmpleado();
    this.getTipoGasto();
    this.getPresupuestos();
    this.getProveedores();
    this.getPartidas();
  }

  private getDatosEmpleado(): void {
    this.userService.getUsuarioDetalle().subscribe({
      next: (data: any) => {
        if (data.length > 0) {
          this.captureForm.patchValue({
            empresa: data[0].empresa,
            area: data[0].area,
            encargado: data[0].nombre
          });
        }
      },
      error: (err) => this.handler.handleError(),
    });
  }

  private getPartidas(): void {
    this.utilService.getPartida().subscribe({
      next: (data: any) => { this.partidas = data; },
      error: (err) => this.handler.handleError(),
    });
  }

  private getTipoGasto(): void {
    this.utilService.getTipoGasto().subscribe({
      next: (data: any) => { this.tipoGastos = data; },
      error: (err) => this.handler.handleError(),
    });
  }

  private getPresupuestos(): void {
    this.utilService.getPresupuestosAsignados().subscribe({
      next: (data: any) => {
        console.log(data);
         
        this.presupuestos = data; },
      error: (err) => this.handler.handleError(),
    });
  }

  private getProveedores(): void {
    this.utilService.getProveedores().subscribe({
      next: (data: any) => { this.proveedores = data; },
      error: (err) => this.handler.handleError(),
    });
  }

  onChangePresupuesto(resp: string): void {
    const select = this.presupuestos.find(pr => pr.idDetallePresupuesto === resp);
    this.utilService.getPresupuestoSelect({ nombre: select.presupuesto }).subscribe({
      next: (data: any) => { 
        this.partidas = data;
       },
      error: (err) => { this.handler.handleError();}
    });
  }
  

  async onChangePartida(resp: string): Promise<void> {
      (await this.classificationService.getAllClasificaciones({ nombre: resp })).subscribe({
        next: (data: any) => { this.clasificaciones = data; },
        error: (err) => { this.handler.handleError();}
      });
  }

  solicitudGasto(): void {
      this.solicService.createSolicitud(this.captureForm.value).subscribe({
        next: (data: any) => { 
          this.handler.handleSuccess(); 
        },
        error: (err) => { this.handler.handleError();}
      })
  }
}
