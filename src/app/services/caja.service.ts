import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CajaService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getCajas(): Observable<any[]> {
    const headers = this.auth.getHeaders();
    let url = `${environment.baseUrl}Cajas`;
    return this.http.get<any[]>(url, { headers });
  }

  createMovimiento(objet: any): Observable<any[]> {
    const headers = this.auth.getHeaders();
    let url = `${environment.baseUrl}Cajas/Movimiento`;
    return this.http.post<any[]>(url, objet, { headers });
  }
}
