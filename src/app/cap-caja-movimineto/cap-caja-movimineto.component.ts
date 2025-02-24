import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // Importa MatSelectModule
import { CommonModule } from '@angular/common';
import { CajaService } from '../service/caja.service';
import { UtilService } from '../service/util.service';
import { HandlerService } from '../service/handler.service';


@Component({
  selector: 'app-cap-caja-movimineto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule // Asegúrate de importar MatSelectModule
  ],
  templateUrl: './cap-caja-movimineto.component.html',
  styleUrls: ['./cap-caja-movimineto.component.css']
})
export class CapCajaMoviminetoComponent implements OnInit {
  formulario: FormGroup;

  // Opciones para los selects
  conceptos:any = [];
  cajas:any = [];
  movimientos:any = [];

  constructor(
    private cajaServices: CajaService,
    private utils: UtilService,
    private fb: FormBuilder,
    private handler: HandlerService,
    private dialogRef: MatDialogRef<CapCajaMoviminetoComponent>,
    @Inject(MAT_DIALOG_DATA) public gasto: any
  ) {
    // Inicializa el formulario con los controles para los selects
    this.formulario = this.fb.group({
      idCaja: ['', Validators.required],
      idMovimiento: ['', [Validators.required]],
      idConcepto: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCajas();
    this.getConceptos();
    this.getMovimientos();
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const nuevo = this.formulario.value;
      nuevo.monto =  + this.gasto.monto
      this.cajaServices.createMovimiento(nuevo).subscribe({
        next: () => { this.handler.handleSuccess(); },
        error: (err) => { this.handler.handleError();}
      })
      this.dialogRef.close(this.formulario.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getConceptos(){
    this.utils.getConcepto().subscribe({
      next: (data:any) =>{this.conceptos = data}
    })
  }

  getMovimientos(){
    this.utils.getMovimientos().subscribe({
      next: (data:any) => {this.movimientos = data;}
    })
  }

  getCajas(){
    this.cajaServices.getCajas().subscribe({
      next: (data: any) => {this.cajas = data;}
    })
  }
}