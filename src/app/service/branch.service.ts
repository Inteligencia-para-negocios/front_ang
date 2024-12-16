import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sucursal } from 'src/models/interface';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {


  constructor(private http: HttpClient) { }

  getAll(): Observable<Sucursal[]>{
    let url = `${environment.baseUrl}branch/get`;
    return this.http.get<Sucursal[]>(url);
  }

  get_all(){
    return this.http.get(`${environment.baseUrl}branch/get`)
  }

  getById(id:any): Observable<Sucursal[]>{
    let url = `${environment.baseUrl}/branch/getById/${id}`;
    return this.http.get<Sucursal[]>(url);
  }

  crear(sucursal:any): Observable<Sucursal[]>{
    let url = `${environment.baseUrl}branch/create`;
    return this.http.post<Sucursal[]>(url,sucursal);
  }

  eliminar(id:any):Observable<Sucursal[]>{
    let url = `${environment.baseUrl}/branch/delete/${id}`;
    return this.http.delete<Sucursal[]>(url);
  }
}