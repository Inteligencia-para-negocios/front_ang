import { Component, OnInit, Provider } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Concept, Presupuesto, Provedor } from 'src/models/interface';

import Swal from 'sweetalert2';
import { PresupuestoService } from '../../service/presupuesto.service';
import { UtilService } from '../../service/util.service';
import { EmpleadoService } from '../../service/empleado.service';
import { timeout } from 'rxjs';
@Component({
  selector: 'app-asignacion-presupuesto',
  templateUrl: './asignacion-presupuesto.component.html',
  styleUrls: ['./asignacion-presupuesto.component.css']
})
export class AsignacionPresupuestoComponent {
pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  cdRef: any;
  
  constructor(
    private _formBuider: FormBuilder,
    private router: Router,
    private _presupuesto: PresupuestoService,
    private util: UtilService,
    private empleado : EmpleadoService
  ) { }

  public conceptos: Concept[] = []
  public empresas: any[] = []
  public partidas: any[] = []
  public responsables: any[] = []

  public arrayPresupuestos: any[] = []
  public arrayContratistas: Provedor[] = []
  completed: any = 'completed';
  notCompleted: any = 'not-completed'
  public presp: Boolean | undefined
  public filePdf: File | undefined


  //formulario para la asignacion de presupuesto en caso de que se tenga que dividir el presupuesto
  //(ocacionalmente en obras es donde habra la asignacion de presupuesto para las correctas asignaciones a los diferentes contratistas)
  asignacionForm = new FormGroup({
    idPresupuesto: new FormControl('', [Validators.required]),
    monto: new FormControl('', [Validators.required]),
    partida: new FormControl('', [Validators.required]),
    responsable: new FormControl('', [Validators.required]),
    empresa: new FormControl('', [Validators.required]) 
  })

  presupuestoForm = new FormGroup({
    nombrePresp: new FormControl({value: "",disabled: true}),
    montoPresp: new FormControl({value: "",disabled: true}),
    empresaPresp: new FormControl({value: "",disabled: true}),
    fechaInicioPresp: new FormControl({value: "",disabled: true}),
    fechaFinalPresp: new FormControl({value: "",disabled: true}),
    responsablePresp: new FormControl({value: "",disabled: true})

  })


  ngOnInit(): void {
    this.getPresupuestos()
    this.getPartidas()
    this.getEmpleadosResponsables()
    this.getEmpresas()
  }
  registroAsign() {
    // console.log("Usuario : ", sessionStorage.getItem('idUser'))
    console.log("DATAS ---->",this.asignacionForm.value)
    this._presupuesto.asignacion(this.asignacionForm.value).pipe(
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
        this._formBuider.group({
          nombre: new FormControl('', [Validators.required]),
          monto: new FormControl('', [Validators.required]),
          fechaInicial: new FormControl('', [Validators.required]),
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
      this.util.getEmpresas().subscribe({
        next: (data: any) => {
          console.log(data)
            this.empresas = data
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


  getPartidas(){
    this.util.getPartida().subscribe({
      next: (data: any) => {
        console.log(data)
            this.partidas = data
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
  
  getEmpleadosResponsables(){
    //funcion que trae a los responsables de area
    this.empleado.getAll().subscribe({
      next: (data: any) => {
            console.log(data.empleados)
            this.responsables = data.empleados
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
  onCaptureService(selectConcept: Concept) {
    console.log('Service - > ', selectConcept)
  }

  onCapturePresupuesto(selectPresupuesto: any) {
    const objet = {
      idPresupuesto : selectPresupuesto
    }
    this._presupuesto.getPresupuestoByX(objet).subscribe({
      next: (data: any) => {
        this.presupuestoForm.patchValue({
          nombrePresp: (data[0].nombre),
          montoPresp:(this.formatMonto(data[0].montoSolicitado)),
          empresaPresp: (data[0].empresa),//this.formatFecha()
          fechaInicioPresp: (this.formatFecha(data[0].fechaInicio)),
          fechaFinalPresp: (this.formatFecha(data[0].fechaFinal)),//this.formatFecha()
          responsablePresp: (data[0].solicitante)
        })
      }
    })
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

  onCaptureContratista(value: any) {
    console.log(value);
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
