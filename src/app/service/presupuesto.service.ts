import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }


  asignacion(objet : any): Observable<any[]> {
    let url = `${environment.baseUrl}presp/asigned`;
    return this.http.post<any[]>(url, objet);
  }

  getPresupuesto():Observable<any[]>{
      const headers = this.auth.getHeaders();
      let url = `${environment.baseUrl}Presupuestos`;
      return this.http.get<any[]>(url,{headers});
    }

  create(objet : any): Observable<any[]> {
    const headers = this.auth.getHeaders();
    let url = `${environment.baseUrl}Presupuestos/create`;
    return this.http.post<any[]>(url, objet, {headers});
  }

  getList(): Observable<any[]>{
    let url = `${environment.baseUrl}presp/getAsigned`;
    return this.http.get<any[]>(url);
  }

}
