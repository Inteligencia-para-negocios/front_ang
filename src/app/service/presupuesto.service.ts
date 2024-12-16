import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  constructor(
    private http: HttpClient
  ) { }


  asignacion(objet : any): Observable<any[]> {
    let url = `${environment.baseUrl}presp/asigned`;
    return this.http.post<any[]>(url, objet);
  }

  getList(): Observable<any[]>{
    let url = `${environment.baseUrl}presp/getAsigned`;
    return this.http.get<any[]>(url);
  }

}
