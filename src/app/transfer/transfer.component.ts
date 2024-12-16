import { Component } from '@angular/core';
import { Transfer } from 'src/models/interface';
import { CapTransfService } from '../service/cap-transf.service';
import Swal from 'sweetalert2';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  constructor(
    private _TRANSFER_SERVICE: CapTransfService
  ) { }
  public transferencias: Transfer[] = []
  ngOnInit(): void {
    this.getC()
  }
  getC() {
    console.log('dd', this.transferencias);
    console.log(this.transferencias)
    this._TRANSFER_SERVICE.getAll().pipe(
      timeout(5000) // 5000 milisegundos = 5 segundos
    ).subscribe(
      (response) => {
        this.transferencias = response as Transfer[]
        console.log("Cheques", this.transferencias)
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
}