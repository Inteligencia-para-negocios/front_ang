import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area, Provedor } from 'src/models/interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {


  constructor(private http: HttpClient, private auth: AuthService) { }

  getAll(): Observable<Provedor[]> {
    const headers = this.auth.getHeaders();
    let url = `${environment.baseUrl}Empleados`;
    return this.http.get<Provedor[]>(url,{headers});
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