
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private auth_token: string = "";
  private profile: any = null

  // public shippngAddressError:boolean = false

  constructor(
    private httpClient: HttpClient,
  ) {
    // this.readLocally()
    // setTimeout(() => { this.readLocally() }, 1500)
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "accept": "application/json",
      "content-type": "application/json",
      "authorization": (this.auth_token) ? `Bearer ${this.auth_token}` : '',
    })
  }

  login(usuario: string, pass: string) {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'content-type': 'application/json'
    })
    this.httpClient.post(`${environment.baseUrl}/login/`, {
      usuario,
      pass
    }, {
      headers: headers
    }).pipe(
      // this.toast.observe({
      //   loading: 'Iniciando sesión',
      //   success: '¡Bienvenido!',
      //   error: 'Las credenciales no coinciden'
      // })
    ).subscribe({
      next: (r: any) => {
        const token = r.access_token
        const usuasrio = r.usuario
        if (token) {
          sessionStorage.setItem("auth_token", token)
          console.log("ssss", usuasrio)
        }
      },
      error: (err) => {
        /**Error
         * {
              "statusCode": 400,
              "message": "Email already exists",
              "error": "Bad Request"
            }
         */
        console.log(err)
      }
    })
  }

  getToken() {
    return this.auth_token
  }


  logout() {
    sessionStorage.clear()    // sessionStorage.removeItem('customer_data')
    // this.profile = null
  }
  /*
    Esta funcion de codigo para enviar 
    el codigo recibe un numero entero no repetido
    cual sera el id del empleado responsable
  */
  sendCodeTwilio(id : any){
    let url = `${environment.baseUrl}verify/getCelEmpleado`;
    return this.httpClient.post<any[]>(url,id);
  }

  verifyCodeTwilio(verify : any){
    let url = `${environment.baseUrl}verify/verifyCode`;
    return this.httpClient.post<any[]>(url,verify);
  }




  sigin(usuario: any): Observable<any[]> {
    let url = `${environment.baseUrl}login`;
    return this.httpClient.post<any[]>(url, usuario);
  }
}

