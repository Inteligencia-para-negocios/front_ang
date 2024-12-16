import { Component, OnInit, Provider } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Concept, Presupuesto, Provedor } from 'src/models/interface';
import { CapGastos } from '../service/cap-gastos.service';
import { UtilService } from '../service/util.service';
import Swal from 'sweetalert2';
import { timeout } from 'rxjs';
import { ProviderService } from '../service/provider.service';
import { PresupuestoService } from '../service/presupuesto.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  cdRef: any;


  //variables para controlar y mantener los datos de la asignacion de presupuesto

  //formulario para registro de asignaciones y poder hacer operaciones correspondientes para
  //el registro de los montos a descontar para llevar el control de los presupuestos de la empresa.

  public idPresupuestoGeneral = 0;
  public montoAsignacion = 0;
  public idContratista = 0;
  public montoResta = 0;
  //

  constructor(
    private _formBuider: FormBuilder,
    private router: Router,
    private _SERVICE_GASTIS: CapGastos,
    private _UTIL_SERVICE: UtilService,
    private _Providers_: ProviderService,
    private _presupuesto: PresupuestoService,


  ) { }

  public conceptos: Concept[] = []
  public arrayPresupuestos: Presupuesto[] = []
  public arrayContratistas: Provedor[] = []
  completed: any = 'completed';
  notCompleted: any = 'not-completed'
  public presp: Boolean | undefined
  public filePdf: File | undefined
  //formulario para la asignacion de presupuesto en caso de que se tenga que dividir el presupuesto
  //(ocacionalmente en obras es donde habra la asignacion de presupuesto para las correctas asignaciones a los diferentes contratistas)
  asignacionForm = new FormGroup({
    idPresupuesto: new FormControl('', [Validators.required]),
    montoAsignado: new FormControl('', [Validators.required]),
    servicio: new FormControl('', [Validators.required]),
    idContratista: new FormControl('', [Validators.required]),
    fechaInicio: new FormControl('', Validators.required),
    fechaFinal: new FormControl('', [Validators.required]),
    idUser: new FormControl(sessionStorage.getItem('idUser'), [Validators.required]),
    //file: new FormControl(null,[Validators.required])
  })


  //formulario para registrar los presupuestos generales, sumas totales de algun proyecto o actividad de la empresa.
  captureForm = new FormGroup({
    presupuesto: new FormControl('', [Validators.required]),
    monto: new FormControl('', [Validators.required]),
    fechaInicial: new FormControl('', [Validators.required]),
    fechaFinal: new FormControl('', [Validators.required]),
    concepto: new FormControl(this.conceptos[0], Validators.required),
    // idUser: new FormControl('1'),
    contratista: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    // this.onRegisterPresupuesto()
    this.getConcept()
    this.verifyPresp()
    this.getListPresupuestos()
    this.getListContratistas()
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    console.log("=>", selectedFile)
    //this.asignacionForm.patchValue({file:selectedFile})
    if (selectedFile) {
      const reader = new FileReader();
      const formData = new FormData();
      formData.append('document', selectedFile);
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        // Actualiza la vista
        this.cdRef.detectChanges();
      };
      if (selectedFile) {
        // Assuming you have a server to handle file uploads, you can generate a URL for the uploaded file
        this.pdfSrc = ''; // Replace with the actual URL
        console.log("-->", this.pdfSrc)
      }

      reader.readAsArrayBuffer(selectedFile);
    }
  }

  CreateAssignment() {
    console.log("Objeto ->", this.asignacionForm.value)
    this._presupuesto.asignacion(this.asignacionForm.value).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La asignacion se ha procesado correctamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.asignacionForm = this._formBuider.group({
          idPresupuesto: new FormControl('', [Validators.required]),
          montoAsignado: new FormControl('', [Validators.required]),
          servicio: new FormControl('', [Validators.required]),
          idContratista: new FormControl('', [Validators.required]),
          fechaInicio: new FormControl('', Validators.required),
          fechaFinal: new FormControl('', [Validators.required]),
          idUser: new FormControl(sessionStorage.getItem('idUser'), []),
        })
      }
    )
  }

  registroPresupuesto() {
    console.log("Usuario : ", sessionStorage.getItem('idUser'))
    console.log(this.captureForm.value)
    this._UTIL_SERVICE.crear(this.captureForm.value).pipe(
      timeout(5000) // 5000 milisegundos = 5 segundos
    ).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Presupuesto registrado',
          showConfirmButton: false,
          timer: 1500
        });
        this.getListPresupuestos()
        this.captureForm = this._formBuider.group({
          presupuesto: new FormControl('', [Validators.required]),
          monto: new FormControl('', [Validators.required]),
          fechaInicial: new FormControl('', [Validators.required]),
          fechaFinal: new FormControl('', [Validators.required]),
          concepto: new FormControl(this.conceptos[0], Validators.required),
          // idUser: new FormControl(''),
          contratista: new FormControl(''),
        })
      },
      (error) => {
        console.log(error)
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


  onRegisterPresupuesto() {
    console.log(this.captureForm.value)
  }

  onCaptureService(selectConcept: Concept) {
    console.log('Service - > ', selectConcept)
  }

  onCapturePresupuesto(selectConcept: any) {
    console.log('Presupuesto - >', selectConcept)
  }

  onCaptureContratista(value: any) {
    console.log(value);
  }



  //creacion de asignacion de presupuesto sin documentantacion requisitada
  //esta se adjuntara en un apartado mas detallado del contratista y del presupuesto
  createAsignacionPresupuesto() {

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

  getListPresupuestos() {
    this._UTIL_SERVICE.getList().subscribe({
      next: (data: any) => {
        this.arrayPresupuestos = data as Presupuesto[]
        console.log("presupuestos", this.arrayPresupuestos)
        setTimeout(() => {
        }, 1000)
      }
    })
  }

  verifyPresp() {
    if (this.arrayPresupuestos.length > 0) {
      this.presp = true
    } else {
      this.presp = false
    }
    return this.presp
  }

  getListContratistas() {
    this._Providers_.getContatistas().subscribe({
      next: (data: any) => {
        this.arrayContratistas = data as Provedor[]
        console.log("contratistas ->", this.arrayContratistas)
        setTimeout(() => {
        }, 1000)
      }
    })
  }
}
