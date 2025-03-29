import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transfer } from 'src/models/interface';

@Injectable({
  providedIn: 'root'
})
export class CapTransfService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Transfer[]> {
    let url = `${environment.baseUrl}transfer/get`;
    return this.http.get<Transfer[]>(url);
  }

  getById(id: any): Observable<Transfer[]> {
    let url = `${environment.baseUrl}trasfer/getById/${id}`;
    return this.http.get<Transfer[]>(url);
  }

  crear(transfer: any): Observable<Transfer[]> {
    let url = `${environment.baseUrl}transfer/create`;
    return this.http.post<Transfer[]>(url, transfer);
  }

//   eliminar(id: any): Observable<Transfer[]> {
//     let url = `${environment.baseUrl}transfer/delete/${id}`;
//     return this.http.delete<Transfer[]>(url);
//   }
}
