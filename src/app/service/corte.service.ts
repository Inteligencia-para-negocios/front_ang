import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CorteService {
  private cortes: any [] = [];
  private id : number = 0
  constructor(
    private http : HttpClient
  ) { }
  
  getAll(): Observable<any[]> {
    let url = `${environment.baseUrl}efes/getLocal`;
    return this.http.get<any[]>(url);
  }

  getRecibos(): Observable<any[]> {
    let url = `${environment.baseUrl}ajuste/getRecibos`;
    return this.http.get<any[]>(url);
  }


  getListCorteP(id : any):Observable<any[]>{
    let url = `${environment.baseUrl}parciales/getParcial`;
    return this.http.get<any[]>(url);
  }

  createCorteParcial(id:any):Observable<any[]>{
    let url = `${environment.baseUrl}parciales/genCorteParcial${id}`;
    return this.http.get<any[]>(url);
  }

  getListCorteDetalle(id:any): Observable<any[]>{
    let url = `${environment.baseUrl}parciales/getList${id}`;
    return this.http.get<any[]>(url);
  }


  ajusteCorte(dispositivo: any): Observable<any[]> {
    let url = `${environment.baseUrl}ajuste/create`;
    return this.http.post<any[]>(url, dispositivo);
  }
  detalleajusteCorte(dispositivo: any): Observable<any[]> {
    let url = `${environment.baseUrl}ajuste/detalleCorteAjuste`;
    return this.http.post<any[]>(url, dispositivo);
  }

  createAjusteDirectTesoreria(dispositivo: any): Observable<any[]> {
    let url = `${environment.baseUrl}ajuste/createAjusteCorte`;
    return this.http.post<any[]>(url, dispositivo);
  }


  getDetalleTesoreria(dispositivo: any): Observable<any> {
    let url = `${environment.baseUrl}ajuste/getDetalleTesoreria`;
    return this.http.post<any>(url, dispositivo);
  }
  
  entregas(corte: any): Observable<any[]> {
    let url = `${environment.baseUrl}ajuste/entregaEfectivoX`;
    return this.http.post<any[]>(url, corte);
  }

  updateEntrega(corte : any): Observable<any []>{
    let url = `${environment.baseUrl}ajuste/entregaEfectivoX`;
    return this.http.put<any[]>(url,corte)
  }

  detalleX(id : any): Observable<any[]> {
    let url = `${environment.baseUrl}ajuste/getDetalle`;
    return this.http.post<any[]>(url,id);
  }



  setCortes(cortes: any[]) {
    this.cortes = cortes;
  }

  getCortes(): any []{
    return this.cortes;
  }
  
  setIdNumCorte(id: any){
    this.id = id
  }

  getIdNumCorte(){
    return this.id
  }



}
