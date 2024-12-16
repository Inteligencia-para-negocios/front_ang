import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area, Empleado, Provedor } from 'src/models/interface';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {


  constructor(private http: HttpClient) { }

  getAll(): Observable<Provedor[]> {
    let url = `${environment.baseUrl}provider/get`;
    return this.http.get<Provedor[]>(url);
  }

  getById(id: any): Observable<Provedor[]> {
    let url = `${environment.baseUrl}provider/getById/${id}`;
    return this.http.get<Provedor[]>(url);
  }

  crear(area: any): Observable<Empleado> {
    let url = `${environment.baseUrl}provider/create`;
    return this.http.post<Empleado>(url, area);
  }

  eliminar(id: any): Observable<Provedor> {
    let url = `${environment.baseUrl}provider/delete/${id}`;
    return this.http.delete<Provedor>(url);
  }


  getContatistas(){
    let url = `${environment.baseUrl}provider/contratista`;
    return this.http.get<Provedor[]>(url);
  }
}