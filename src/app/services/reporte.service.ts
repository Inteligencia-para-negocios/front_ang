import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area, Reporte, ReporteGastos } from 'src/models/interface';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }

  getAll(id : any): Observable<ReporteGastos[]> {
    let url = `${environment.baseUrl}gastos/getAll${id}`;
    return this.http.get<ReporteGastos[]>(url);
  }

  getAllP(): Observable<ReporteGastos[]> {
    let url = `${environment.baseUrl}gastos/getP`;
    return this.http.get<ReporteGastos[]>(url);
  }

  getAllC(id : any): Observable<ReporteGastos[]> {
    let url = `${environment.baseUrl}gastos/getClean${id}`;
    return this.http.get<ReporteGastos[]>(url);
  }

  getAllRevolventes(id:any): Observable<ReporteGastos[]>{
    let url = `${environment.baseUrl}gastos/getRevo${id}`;
    return this.http.get<ReporteGastos[]>(url);
  }
  
  getMonto(id:any):Observable<any[]>{
    let url = `${environment.baseUrl}gastos/getMont${id}`;
    return this.http.get<ReporteGastos[]>(url);
  }

  getAllA( ): Observable<ReporteGastos[]> {
    let url = `${environment.baseUrl}gastos/getA`;
    return this.http.get<ReporteGastos[]>(url);
  }

  getAllNoLib(): Observable<ReporteGastos[]>{
    let url = `${environment.baseUrl}gastos/getnolib`
    return this.http.get<ReporteGastos[]>(url);
  }

  getId(id: any): Observable<ReporteGastos[]> {
    let url = `${environment.baseUrl}gastos/getId${id}`;
    return this.http.get<ReporteGastos[]>(url);
  }

  getIdRevolente(id: any): Observable<ReporteGastos[]> {
    let url = `${environment.baseUrl}gastos/getIdRevol${id}`;
    return this.http.get<ReporteGastos[]>(url);
  }

  updateGasto(update: any): Observable<ReporteGastos[]> {
    let url = `${environment.baseUrl}gastos/update`;
    return this.http.put<ReporteGastos[]>(url,update);
  }

  changeStatus(id: any): Observable<any[]> {
    let url = `${environment.baseUrl}gastos/updateAuth`;
    return this.http.put<any[]>(url,id);
  }


  changeLib(id: any): Observable<any[]> {
    let url = `${environment.baseUrl}gastos/updateLib`;
    return this.http.put<any[]>(url,id);
  }

  getRevolvente(){
    let url = `${environment.baseUrl}revolvente/get`
    return this.http.get<any[]>(url)
  }

  registrarGastoRev(reporte : any){//crer 
    let url = `${environment.baseUrl}revolvente/createRev`
    return this.http.post<any[]>(url, reporte);

  }

  // http://localhost:8000/api/v1/gastos/getId
  getById(id: any): Observable<Reporte[]> {
    let url = `${environment.baseUrl}/branch/getById/${id}`;
    return this.http.get<Reporte[]>(url);
  }

  crear(reporte: any): Observable<Reporte[]> {
    let url = `${environment.baseUrl}gastos/create`;
    return this.http.post<Reporte[]>(url, reporte);
  }

  eliminar(id: any): Observable<void> {
    let url = `${environment.baseUrl}/branch/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
