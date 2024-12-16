import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UtilService } from '../service/util.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-dep-compras',
  templateUrl: './dep-compras.component.html',
  styleUrls: ['./dep-compras.component.css']
})
export class DepComprasComponent {
  completed: any = 'completed';
  notCompleted: any = 'not-completed'

  constructor(
    private _formBuider: FormBuilder,
    private router: Router,
    private util: UtilService

  ) { }


  excelForm = new FormGroup({
    archivo: new FormControl('', [Validators.required])
  })


  onChangeSucursal(file: File) {
    try {
      console.log("saber", file)
    } catch (error) {
      console.log(error)
    }
  }


  // leerXls() {
  //   console.info("::leyendo excel::")
  //   this.util.leerExel(this.excelForm.value).subscribe(
  //     (response) => {
  //       console.log(response)
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'success',
  //         title: 'Exito',
  //         showConfirmButton: false,
  //         timer: 1500
  //       });

  //     },
  //     (error) => {
  //       console.log(error)
  //     }
  //   );
  // }

}
