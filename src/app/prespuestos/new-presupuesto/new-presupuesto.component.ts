import { Component, OnInit, Provider } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Concept, Presupuesto, Provedor } from 'src/models/interface';
import { CapGastos } from '../../service/cap-gastos.service';
import { UtilService } from '../../service/util.service';
import Swal from 'sweetalert2';
import { timeout } from 'rxjs';
import { ProviderService } from '../../service/provider.service';
import { PresupuestoService } from '../../service/presupuesto.service';

@Component({
  selector: 'app-new-presupuesto',
  templateUrl: './new-presupuesto.component.html',
  styleUrls: ['./new-presupuesto.component.css']
})
export class NewPresupuestoComponent {
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
    private _UTIL_SERVICE: UtilService,
    private _Providers_: ProviderService,
    private _presupuesto: PresupuestoService,


  ) { }

  public empresas: any[] = []
  public arrayPresupuestos: any[] = []
  completed: any = 'completed';
  notCompleted: any = 'not-completed'
  public presp: Boolean | undefined
  public filePdf: File | undefined
 

  //formulario para registrar los presupuestos generales, sumas totales de algun proyecto o actividad de la empresa.
  captureForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    monto: new FormControl('', [Validators.required]),
    fechaInicio: new FormControl('', [Validators.required]),
    fechaFinal: new FormControl('', [Validators.required]),
    empresa: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    // this.onRegisterPresupuesto()
    this.getEmpresas()
    this.getPresupuestos()
    
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    console.log("=>", selectedFile)
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
        this.pdfSrc = ''; // Replace with the actual URL
        console.log("-->", this.pdfSrc)
      }

      reader.readAsArrayBuffer(selectedFile);
    }
  }

  registroPresupuesto() {
    console.log("Usuario : ", sessionStorage.getItem('idUser'))
    console.log(this.captureForm.value)
    this._presupuesto.create(this.captureForm.value).pipe(
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
        this.getPresupuestos();
        this.captureForm = this._formBuider.group({
          nombre: new FormControl('', [Validators.required]),
          monto: new FormControl('', [Validators.required]),
          fechaInicio: new FormControl('', [Validators.required]),
          fechaFinal: new FormControl('', [Validators.required]),
          empresa: new FormControl(this.empresas[0], Validators.required),
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

  getEmpresas(){
      this._UTIL_SERVICE.getEmpresas().subscribe({
        next: (data: any) => {
          console.log(data)
            this.empresas = data
            console.log(this.empresas)
          },
          error(err) {
                console.error(err);
                Swal.fire({
                position: 'center',
                icon: 'error',
                title: err.error.sqlMessage,
                showConfirmButton: false,
                timer: 3000
              }); 
            },
          })
  }

  getPresupuestos(){
      this._presupuesto.getPresupuesto().subscribe({
        next: (data: any) => {
          console.log(data)
            this.arrayPresupuestos = data
            console.log(this.arrayPresupuestos)
          },
          error(err) {
                console.error(err);
                Swal.fire({
                position: 'center',
                icon: 'error',
                title: err.error.sqlMessage,
                showConfirmButton: false,
                timer: 3000
              }); 
            },
          })
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

  formatMonto(monto: number): string {
    return `$${monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

  formatFecha(fechaISO: string): string {
    const parsedDate = new Date(fechaISO);
    const day = parsedDate.getDate().toString().padStart(2, '0') ;
    const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    const monthIndex = parsedDate.getMonth();
    const monthName = monthNames[monthIndex];
    const year = parsedDate.getFullYear().toString();
    return `${day}/${monthName}/${year}`;
  }

  verifyPresp() {
    if (this.arrayPresupuestos.length > 0) {
      this.presp = true
    } else {
      this.presp = false
    }
    return this.presp
  }

}
