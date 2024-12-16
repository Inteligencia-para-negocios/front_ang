import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area, Provedor } from 'src/models/interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {


  constructor(private http: HttpClient) { }

  getAll(): Observable<Provedor[]> {
    let url = `${environment.baseUrl}empleados/get`;
    return this.http.get<Provedor[]>(url);
  }

  getById(id: any): Observable<Provedor[]> {
    let url = `${environment.baseUrl}provider/getById/${id}`;
    return this.http.get<Provedor[]>(url);
  }

  crear(empleado: any): Observable<Provedor> {
    let url = `${environment.baseUrl}empleados/create`;
    return this.http.post<Provedor>(url, empleado);
  }

  eliminar(id: any): Observable<Provedor> {
    let url = `${environment.baseUrl}provider/delete/${id}`;
    return this.http.delete<Provedor>(url);
  }
}