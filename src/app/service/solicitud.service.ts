import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private utils: UtilService
  ) {}

  createSolicitud(objet : any): Observable<any[]> {
    const headers = this.auth.getHeaders();
    let url = `${environment.baseUrl}Solicitudes/`;
    return this.http.post<any[]>(url, objet, {headers});
  }
}
