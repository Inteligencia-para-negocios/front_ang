import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { UtilService } from '../service/util.service';
import { ReporteGastos, Status } from 'src/models/interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReporteService } from '../service/reporte.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-auth-gastos',
  templateUrl: './auth-gastos.component.html',
  styleUrls: ['./auth-gastos.component.css']
})
export class AuthGastosComponent implements OnInit {

  public reportes: ReporteGastos[] = []

  completed: any = 'status completed';
  process: any = 'status process';
  pending: any = 'status pending'
  public celular: any


  public status: Status[] = []
  constructor(
    private util: UtilService,
    private gastos: ReporteService,
    private twilio: AuthService

  ) { }



  sendCodeAndReturnPromise(century: any) {
    return new Promise((resolve, reject) => {
      this.twilio.sendCodeTwilio(century).pipe().subscribe({
        next: (data: any) => {
          this.celular = data as any;
          console.log("data ::: ", data);
          resolve(this.celular); // Resolvemos la Promesa con el valor de this.celular
        },
        error: (error: any) => {
          reject(error); // Rechazamos la Promesa en caso de error
        }
      });
    });
  }

  auth = new FormGroup({
    status: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
  })
  ngOnInit(): void {
    this.getArea()
    this.getGastos()
  }

  onChangeSucursal(selectedSucursal: string, folio: any, idUserAuth: Number) {
    console.log(selectedSucursal)
    console.log(folio)
    console.log(idUserAuth)
    switch (selectedSucursal) {
      case '1':
        this.SolVerify(idUserAuth, folio, selectedSucursal)
        console.log('El gasto fue aprobado');
        console.log('El gasto se debe de mostrar como gasto pendiente a comprobar es decir que el gasto fue autorizado y ha sido liberado por lo cual se espera que el gasto sea comprobado en su totalidad')
        //actualizar el gasto autorizado pendiente.
        break;
      case '2':
        console.log('El gasto fue rechazado, se debe de mostrar en los gastos capturados por el usuario que efectuo el gasto con el target de rechazado')
        this.SolVerify(idUserAuth, folio, selectedSucursal)

        //actualizar gasto rechazo de autorizacion
        break;
      case '3':
        //el gasto se encuentra pendiente por resolucion  
        //mandar mensaje de que el gasto se puso como pendiente
        
        console.log('El gasto fue puesto como pendiente');
        console.log('El gasto se debe de mostrar como pendiente a liberar en muestra que no se ha resuelto nada sobre el gasto solicitado.')
        break;
      default:
        console.log(`Y so siempre voy a estar ${selectedSucursal}.`);
        break;
    }

  }

  getGasto(id: any) {
    const req = {
      id: id
    }
    console.log("gasto para actualizar el estado de liberado en la base de datos")
  }



  SolVerify(id: any, folio: number, selectedSucursal: any) {
    const req = {
      id: id
    }
    console.log("cuerpo", req)
    this.sendCodeAndReturnPromise(req)
      .then((celular) => {
        Swal.fire({
          title: 'Ingresa el codigo de verificacion',
          input: 'number',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Verificar',
          showLoaderOnConfirm: true,
          preConfirm: async (codigo) => {
            try {
              console.log("::::recibiendo codigo de confirmacion: -- >", codigo)
            } catch (error) {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              );
            }
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          console.log("resultado ::::", result)
          //aqui ira la peticion
          const verify = {
            cel: celular,
            code: result.value
          }

          const century = {
            id: folio
          }

          console.log("cuerpecillo ::::", verify)
          console.log("codigo enviado", result.value)
          if (result.isConfirmed) {
            console.log("se envio el codigo")
            this.twilio.verifyCodeTwilio(verify).subscribe({
              next: (data: any) => {
                console.log("response ::::::::::::::;", data)
                if (data.verifyCod['valid']) {
                  if (selectedSucursal == '2') {
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'El gasto ha sido rechazado',
                      text : 'Comunicate con el administrador de sistema',
                      showConfirmButton: false,
                      timer: 2500
                    });
                    window.location.reload()
                  } else {
                    this.gastos.changeStatus(century).subscribe({
                      next: (data: any) => {
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'El gasto ha sido aprobado',
                          showConfirmButton: false,
                          timer: 2500
                        });
                        window.location.reload()
                      }
                    })
                    console.log("veremos que show a ver que pex1")
                  }
                } else {
                  Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Error en el codigo',
                    text: data.verifyCod['status'],
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
              }
            })
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Se cancelo la liberacion',
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        // Aquí puedes realizar cualquier acción adicional que necesites con 'celular'
      })
      .catch((error) => {
        console.error("Error al enviar el código:", error);
      });
  }

  getArea() {
    this.util.getStatus().subscribe({
      next: (data: any) => {
        this.status = data as Status[]
        console.log(this.status)
      }
    })
  }

  getGastos() {
    this.gastos.getAllA().subscribe({
      next: (data: any) => {
        console.log(data)
        this.reportes = data as ReporteGastos[]
      }
    })
  }
}
