import { Component } from '@angular/core';
import { Status } from 'src/models/interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GastoService } from '../service/gasto.service';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { CapCajaMoviminetoComponent } from '../cap-caja-movimineto/cap-caja-movimineto.component'; // Importa el componente del modal
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-tesoreria',
  templateUrl: './auth-tesoreria.component.html',
  styleUrls: ['./auth-tesoreria.component.css']
})
export class AuthTesoreriaComponent {

  completed: any = 'status completed';
  process: any = 'status process';
  pending: any = 'status pending'
  public gastos: any;

  public status: Status[] = []
  constructor(
    private gastosService: GastoService,
    private dialog: MatDialog // Inyecta MatDialog
  ) { }

  auth = new FormGroup({
    status: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
  })

  ngOnInit(): void {
    this.getGastos()
  }

  getGastos() {
    this.gastosService.getGastos().subscribe({
      next: (data: any) => {
        this.gastos = data;        
      }
    })
  }

  liberacion(obj: any) {
    const dato = { id: obj.idGasto, monto: obj.monto };

    // Abre el modal
    const dialogRef = this.dialog.open(CapCajaMoviminetoComponent, {
      width: '500px',
      data: dato // Puedes pasar datos al modal si es necesario
    });

    // Escucha cuando se cierra el modal
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos del formulario:', result);
        // Aquí puedes llamar al servicio para autorizar el gasto
        this.gastosService.authGasto(dato).subscribe({
          next: () => {
            console.log('Gasto autorizado');
            this.getGastos(); // Actualiza la lista de gastos
          },
          error: (err) => {
            console.error('Error al autorizar el gasto:', err);
          }
        });
      }
    });
  }
}