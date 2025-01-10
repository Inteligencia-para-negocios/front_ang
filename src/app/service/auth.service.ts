
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { User2 } from '../../models/interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private access_token:string | undefined
  public user: User2 | undefined

  private auth_token : string | undefined

  constructor(
    private http: HttpClient
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
   * Obtiene el token almacenado en LocalStorage
   * @returns String `Bearer [TOKEN]`
   */
  get accessToken(){
    const t = localStorage.getItem('oat') // oAuth Access Token
    // this.access_token = t
    return this.access_token
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
        'Authorization': `Bearer ${this.accessToken}`
      })
    };
    
    const pet = await this.http.get(`${environment.baseUrl}/auth/logout`, httpOptions).toPromise() as any
    if(pet){
      // this.access_token = null
      localStorage.removeItem('oat')
    }
    return pet
  }

  updateProfile(){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Authorization': `Bearer ${this.accessToken}`
      })
    };
    const pet = this.http.post(`${environment.baseUrl}/auth/update`, httpOptions).toPromise() as any
  }


  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "accept": "application/json",
      "content-type": "application/json",
      "authorization": (this.auth_token) ? `Bearer ${this.auth_token}` : '',
    })
  }

  // login(usuario: User2,) {
  //   const headers = new HttpHeaders({
  //     'accept': 'application/json',
  //     'content-type': 'application/json'
  //   })
  // }

  getToken() {
    return this.auth_token
  }

  /*
    Esta funcion de codigo para enviar 
    el codigo recibe un numero entero no repetido
    cual sera el id del empleado responsable
  */
  sendCodeTwilio(id : any){
    let url = `${environment.baseUrl}verify/getCelEmpleado`;
    return this.http.post<any[]>(url,id);
  }

  verifyCodeTwilio(verify : any){
    let url = `${environment.baseUrl}verify/verifyCode`;
    return this.http.post<any[]>(url,verify);
  }

  sigin(usuario: any):  Observable<HttpEvent<any[]>> {
    let url = `${environment.baseUrl}Usuarios/login`;
    return this.http.get<any[]>(url,usuario);
  }
}

