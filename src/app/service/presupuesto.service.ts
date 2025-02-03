import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService implements OnInit {

  ngOnInit() {
    this.getHeaders()
  }
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }
  public headers: any

  getHeaders(){
   
  }
  asignacion(objet : any): Observable<any[]> {
    const headers = this.auth.getHeaders();
    let url = `${environment.baseUrl}Presupuesto/Detalle`;
    return this.http.post<any[]>(url,objet,{headers});
  }

  getPresupuesto():Observable<any[]>{
      const headers = this.auth.getHeaders();
      let url = `${environment.baseUrl}Presupuestos`;
      return this.http.get<any[]>(url,{headers});
  }

  getPresupuestoByX(objeto : any):Observable<any[]>{
    let url = `${environment.baseUrl}Presupuestos/filtro`;
    const headers = this.auth.getHeaders();
    let params = new HttpParams();
    Object.keys(objeto).forEach(key => {
      params = params.set(key, objeto[key]);
    });
    console.log(params);
    return this.http.get<any[]>(url,{headers, params});
  }

  postDetalle(objeto : any):Observable<any[]>{
    const headers = this.auth.getHeaders();
    let url = `${environment.baseUrl}`;
    return this.http.post<any[]>(url,objeto,{headers});
  }

  create(objet : any): Observable<any[]> {
    const headers = this.auth.getHeaders();
    let url = `${environment.baseUrl}Presupuestos/`;
    return this.http.post<any[]>(url, objet, {headers});
  }

  getList(): Observable<any[]>{
    const headers = this.auth.getHeaders();
    let url = `${environment.baseUrl}Presupuesto/Detalle`;
    return this.http.get<any[]>(url,{headers});
  }


  updateDetalle(objeto: any) {
    let url = `${environment.baseUrl}Presupuesto/Detalle/`;
    const headers = this.auth.getHeaders();
    return this.http.put<any[]>(url,objeto,{headers});
  }

  authDetalle(objeto: any) {
    let url = `${environment.baseUrl}Presupuesto/Detalle/`;
    const headers = this.auth.getHeaders();
    return this.http.patch<any[]>(url,objeto,{headers});
  }

}
