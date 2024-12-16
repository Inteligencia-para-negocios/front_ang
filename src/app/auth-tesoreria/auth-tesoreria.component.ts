import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteGastos, Status } from 'src/models/interface';
import { UtilService } from '../service/util.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReporteService } from '../service/reporte.service';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-auth-tesoreria',
  templateUrl: './auth-tesoreria.component.html',
  styleUrls: ['./auth-tesoreria.component.css']
})
export class AuthTesoreriaComponent {

  completed: any = 'status completed';
  process: any = 'status process';
  pending: any = 'status pending'
  public reportes: ReporteGastos[] = []
  public celular: any
  private data: any;



  notCompleted: any = 'not-completed'
  public status: Status[] = []
  constructor(
    private util: UtilService,
    private gastos: ReporteService,
    private twilio: AuthService
  ) { }

  auth = new FormGroup({
    status: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
  })

  ngOnInit(): void {
    this.getArea()
    this.getGastos()
  }

  onChangeSucursal(selectedSucursal: string) {
    console.log(selectedSucursal)
    if (selectedSucursal == 'LIBERADO') {
      alert("El gasto ha sido aprobado y tendra seguimiento en tesoreria")
    }
  }

  getArea() {
    this.util.getStatus1().subscribe({
      next: (data: any) => {
        this.status = data as Status[]
        console.log(this.status)
      }
    })
  }


  getGastos() {
    this.gastos.getAllP().subscribe({
      next: (data: any) => {
        this.reportes = data as ReporteGastos[]
        console.log(this.reportes)
      }
    })
  }


  // senCode(century: any){
  //   this.twilio.sendCodeTwilio(century).subscribe({
  //     next: (data: any) => {
  //     }
  //   })
  // }

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

  // Luego, puedes llamar a la función y usar la Promesa para acceder a this.celular

  SolVerify(id: any, folio: number) {
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
                  this.gastos.changeLib(century).subscribe({
                    next: (data: any) => {
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Ya puedes entregar el efectivo!',
                        showConfirmButton: false,
                        timer: 2900
                      });
                      window.location.reload()
                    }
                  })
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


  formatMonto(monto: number): string {
    return `$${monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

  formatFecha(fechaISO: string): string {
    const parsedDate = new Date(fechaISO);
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    const monthIndex = parsedDate.getMonth();
    const monthName = monthNames[monthIndex];
    const year = parsedDate.getFullYear().toString();
    return `${day}/${monthName}/${year}`;
  }
}
