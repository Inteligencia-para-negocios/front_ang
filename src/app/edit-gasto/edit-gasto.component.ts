import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../service/util.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReporteService } from '../service/reporte.service';
import Swal from 'sweetalert2';
import { timeout } from 'rxjs';


@Component({
  selector: 'app-edit-gasto',
  templateUrl: './edit-gasto.component.html',
  styleUrls: ['./edit-gasto.component.css']
})

export class EditGastoComponent implements OnInit {
  constructor(
    private router: Router,
    private utilG: UtilService,
    private _GASTOS: ReporteService
  ) { }

  public isEmptys : boolean | undefined
  public isEmptyd : boolean | undefined


  captureForm = new FormGroup({
    sucursal: new FormControl( '', [Validators.required]),
    provedor: new FormControl('', [Validators.required]),
    cheque: new FormControl('', [Validators.required]),
    efectivoLib: new FormControl('', [Validators.required]),
    area: new FormControl('',Validators.required),
    efeCo : new FormControl('', Validators.required),
    concepto: new FormControl('', [Validators.required]),
    responsable: new FormControl('', [Validators.required]),
    justificacion: new FormControl('', [Validators.required]),
    revolvente : new FormControl ('')
  })

  ngOnInit(): void {
    this.getGasto()
    this.isEmpty()
  }

  getGasto() {
    const gasto = this.utilG.getGasto();
    console.log("Gasto_LOGX",gasto)
    this.captureForm = new FormGroup({
      sucursal: new FormControl({value: gasto[0]['Sucursal'], disabled: true}, Validators.required),
      provedor: new FormControl({value: gasto[0]['Provedor'], disabled: true}, Validators.required),
      cheque: new FormControl({value: gasto[0]['Chequera'], disabled: true}, Validators.required),
      efectivoLib: new FormControl({value: gasto[0]['Liberado'], disabled: true}, Validators.required),
      area: new FormControl({value: gasto[0]['Area'],disabled : true},Validators.required),
      efeCo : new FormControl('',[Validators.required,Validators.pattern('[0-9]*')]),
      concepto: new FormControl({value: gasto[0]['Concepto'], disabled: true}, Validators.required),
      responsable: new FormControl({value: gasto[0]['Responsable'], disabled: true}, Validators.required),
      justificacion: new FormControl({value: gasto[0]['Justificacion'], disabled: true}, Validators.required),
      revolvente : new FormControl ({value: gasto[0]['idRevol'],disabled :true})
    })
  }


  isEmpty(){
    const gasto = this.utilG.getGasto()
    if(gasto[0]['Chequera'] == '' || gasto[0]['Chequera'] == null){
      this.isEmptys = true
      console.log("esta vacio")
    }else {
      if(gasto[0]['idRevol'] == '' || gasto[0]['idRevol'] == null){
        console.log("esta vacio tambien")
        this.isEmptyd = true
      }
    }
  }

  changeState(){
    const gasto = this.utilG.getGasto();
    var efeco = this.captureForm.value.efeCo
    const update = {
      id : gasto[0]['Folio'],
      efeCo: efeco,
      cheque : gasto[0]['idBCheck'],
      revolvente :  gasto[0]['idRevol']
    }
    this._GASTOS.updateGasto(update).pipe(
      timeout(10000) // 5000 milisegundos = 5 segundos
    ).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Gasto comprobado',
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          this.router.navigate(['view-gastos'])
        }, 2000)
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error en la comprobacion',
          text: error.error.mesagge,
          showConfirmButton: false,
          timer: 3000
        });
      }
    )
  }
}
