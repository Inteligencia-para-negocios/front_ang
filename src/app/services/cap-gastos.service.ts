import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Concept, Responsable } from 'src/models/interface';

@Injectable({
  providedIn: 'root'
})
export class CapGastos {

  constructor(private http: HttpClient) { }

  lista(): Observable<any[]> {
    let url = `${environment.baseUrl}`;
    return this.http.get<any[]>(url);
  }

  concept(): Observable<Concept[]> {
    let url = `${environment.baseUrl}concept/get/`;
    return this.http.get<Concept[]>(url);
  }

  getResp(sucursal: any): Observable<Responsable[]> {
    let url = `${environment.baseUrl}branch/getResp`
    return this.http.post<Responsable[]>(url, sucursal)
  }

  createRevol(revolvente : any):Observable<any>{
    return this.http.post<any[]>(`${environment.baseUrl}recurrente/create`,revolvente)
  }
  
  getRevolvente(): Observable<any[]> {
    let url = `${environment.baseUrl}recurrente/get/`;
    return this.http.get<any[]>(url);
  }

  updateRecurrente(id :any): Observable<any[]> {
    let url = `${environment.baseUrl}recurrente/update${id}`;
    return this.http.get<any[]>(url);
  }

  registrar(dispositivo: any): Observable<void> {
    let url = `${environment.baseUrl}dispositivo/crear`;
    return this.http.post<void>(url, dispositivo);
  }

  actualizar(id: any, dispositivo: any): Observable<void> {
    let url = `${environment.baseUrl}dispositivo/actualizar/${id}`;
    return this.http.put<void>(url, dispositivo);
  }

  eliminar(id: any): Observable<void> {
    let url = `${environment.baseUrl}dispositivo/eliminar/${id}`;
    return this.http.delete<void>(url);
  }

  actualizarEstado(id: any, estado: any): Observable<void> {
    let url = `${environment.baseUrl}dispositivo/estado/${id}`;
    return this.http.put<void>(url, estado);
  }
}