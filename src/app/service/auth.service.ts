
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { User2 } from '../../models/interface'
import { Router } from '@angular/router';
import areIntervalsOverlappingWithOptions from 'date-fns/esm/fp/areIntervalsOverlappingWithOptions/index.js';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private access_token:string | undefined
  public user: User2 | undefined

  private auth_token : string | null |undefined

  constructor(
    private http: HttpClient,
    private router :Router
  ) {
    
  }

  /*
   *
   * Conecta a la API para verificar la vigencia de la sesión, si el token existe se crea una `instancia de usuario`, en caso contrario regresa `null`
   * @returns Promise
   */


  private async checkSession(){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Authorization': `Bearer ${this.accessToken}`
      })
    };

    const pet = await this.http.post(`${environment.baseUrl}Usuarios/login`, {}, httpOptions).toPromise()
    if(pet){
      this.user
    }

    return this.user
    
  }

  /** 
   * Validar si existe una sesión activa al entrar a la app
   * 
   * @returns User
   */
   get session(){
    console.log("checando sesion....")
    return this.checkSession()
  }


  /**
   * Obtiene el token almacenado en SessionStorage
   * @returns String `Bearer [TOKEN]`
   */
  accessToken(){
    let t = sessionStorage.getItem('auth_token')
    return t
  }

  /**
   * Iniciar sesión y obtener token Bearer
   * @param usuario  
   * @param clave 
   * @returns Promise
   */

  login(usuario: any) {
    let url = `${environment.baseUrl}Usuarios/login`;
    return this.http.post(url,usuario);
  }
  

  async logout(){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };    
    this.http.get(`${environment.baseUrl}Usuarios/logOut`, httpOptions).subscribe({
      next: (data: any) => {
        console.log(data)
        const token = data.status
        if (token == 200) {
          sessionStorage.removeItem("auth_token")
        }
      }
    })
  }




  getHeaders() {
    const token = this.getToken();
    if (!token) {
      console.error("Token no encontrado");
      // Podrías redirigir al usuario a la página de login si es necesario
    }
    return new HttpHeaders({
      "accept": "application/json",
      "content-type": "application/json",
      "authorization": token ? `Bearer ${token}` : '',
    });
  }

  getToken() {
    return this.accessToken()
  }

  sendCodeTwilio(id : any){
    let url = `${environment.baseUrl}verify/getCelEmpleado`;
    return this.http.post<any[]>(url,id);
  }

  verifyCodeTwilio(verify : any){
    let url = `${environment.baseUrl}verify/verifyCode`;
    return this.http.post<any[]>(url,verify);
  }
}

