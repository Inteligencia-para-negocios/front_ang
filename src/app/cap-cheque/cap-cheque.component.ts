import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { timeout } from 'rxjs/operators';
import { CapChequeService } from '../service/cap-cheque.service';
import Swal from 'sweetalert2';
import { CapGastos } from '../service/cap-gastos.service';
import { Concept } from 'src/models/interface';
import { UtilService } from '../service/util.service';


@Component({
  selector: 'app-cap-cheque',
  templateUrl: './cap-cheque.component.html',
  styleUrls: ['./cap-cheque.component.css']
})
export class CapChequeComponent {
  constructor(
    private _formBuider: FormBuilder,
    private _CHEQUE_SERVICE: CapChequeService,
    private _SERVICE_GASTIS: CapGastos,
    private util: UtilService
  ) { }

  completed: any = 'completed';
  notCompleted: any = 'not-completed'

  characterCount: number = 0;

  public conceptos: Concept[] = []
  public capt: any[] = []
  captureForm = new FormGroup({
    folio: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'),Validators.maxLength(4),Validators.minLength(4)]),
    chequera: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(4),Validators.minLength(4)]),
    importe: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    concepto: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    idUser: new FormControl('', Validators.required),
    asignacion: new FormControl('', Validators.required)
  })
  
  countCharacters(event: any): void {
    const inputValue = event.target.value;
    this.characterCount = inputValue.length > 4 ? 4 : inputValue.length;
  }

  ngOnInit(): void {
    this.captureForm.patchValue({
      folio: '',
      chequera: '',
      importe: '',
      concepto: '',
      idUser: sessionStorage.getItem('idUser'),
      asignacion: ''
    })
    this.getConcept()
    this.getCaoturista()
  }

  registroCheque() {
    console.log("Captura de chequesm  ----> ", this.captureForm.value)
    this._CHEQUE_SERVICE.crear(this.captureForm.value).pipe(
      timeout(5000) // 5000 milisegundos = 5 segundos
    ).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cheque registrado',
          showConfirmButton: false,
          timer: 1500
        });
        this.captureForm = this._formBuider.group({
          folio: ['', Validators.required],
          chequera: ['', Validators.required],
          importe: ['', Validators.required],
          concepto: ['', Validators.required],
          idUser: ['', Validators.required],
          asignacion: ['', Validators.required]
        })
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.title,
          text: error.error.mesagge,
          showConfirmButton: false,
          timer: 3000
        });
      }
    );
  }

  getConcept() {
    this._SERVICE_GASTIS.concept().subscribe({
      next: (data: any) => {
        this.conceptos = data as Concept[]
        console.log("conceptos", this.conceptos)
        setTimeout(() => {
        }, 1000)
      }
    })
  }

  //crear interface para los usuarios 
  getCaoturista() {
    this.util.getCapt().subscribe({
      next: (data: any) => {
        this.capt = data as any[]
        // console.log("conceptos", this.conceptos)
        setTimeout(() => {
        }, 1000)
      }
    })
  }
  // cancelar() {
  //   Swal.fire({
  //     text: "se esta cancelando el registro!",
  //     confirmButtonColor: '#3085d6',
  //     timer: 2000,
  //     timerProgressBar: true,
  //     didOpen: () => {
  //       Swal.showLoading()
  //     }
  //   }
  //   ).then((result1) => {
  //     if (result1) {
  //       location.reload()
  //     }
  //   })
  // }

}
