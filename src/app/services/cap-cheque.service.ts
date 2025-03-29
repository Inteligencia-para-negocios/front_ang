import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cheque } from 'src/models/interface';

@Injectable({
  providedIn: 'root'
})
export class CapChequeService {
  private gasto: any;

  constructor(private http: HttpClient) { }


  cheuqeUpdate (id: any){
    let url = `${environment.baseUrl}cheque/closed`;
    return this.http.post<any[]>(url,id);
  }

  getAll(): Observable<Cheque[]> {
    let url = `${environment.baseUrl}cheque/get`;
    return this.http.get<Cheque[]>(url);
  }

  getOpen(): Observable<Cheque[]> {
    let url = `${environment.baseUrl}cheque/getOpen`;
    return this.http.get<Cheque[]>(url);
  }


  getContabilidad(): Observable<any[]> {
    let url = `${environment.baseUrl}cheque/contabilidad`;
    return this.http.get<any[]>(url);
  }
  // contabilidadEntrega

  entrega(cheque : any): Observable<any[]> {
    let url = `${environment.baseUrl}cheque/entrega`;
    return this.http.post<any[]>(url,cheque);
  }
  revisionContabilidad(cheque : any): Observable<any[]> {
    let url = `${environment.baseUrl}cheque/contabilidadEntrega`;
    return this.http.post<any[]>(url,cheque);
  }
  entregaContabilidad(cheque : any): Observable<any[]> {
    let url = `${environment.baseUrl}cheque/entrega2fd`;
    return this.http.post<any[]>(url,cheque);
  }



  verify(cheque : any): Observable<Cheque[]> {
    let url = `${environment.baseUrl}cheque/verify`;
    return this.http.post<Cheque[]>(url,cheque);
  }

  getChUser(usuario: any): Observable<Cheque[]> {
    let url = `${environment.baseUrl}cheque/getUsuario`;
    return this.http.post<Cheque[]>(url, usuario);
  }
  getById(id: any): Observable<any[]> {
    let url = `${environment.baseUrl}cheque/getById`;
    return this.http.post<any[]>(url,id);
  }

  crear(cheque: any): Observable<Cheque[]> {
    let url = `${environment.baseUrl}cheque/create`;
    return this.http.post<Cheque[]>(url, cheque);
  }

  eliminar(id: any): Observable<Cheque[]> {
    let url = `${environment.baseUrl}provider/delete/${id}`;
    return this.http.delete<Cheque[]>(url);
  }

  setGastos(gasto: any) {
    this.gasto = gasto;
  }

  getGastos(): any {
    return this.gasto;
  }
}
