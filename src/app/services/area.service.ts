import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area } from 'src/models/interface';

@Injectable({
  providedIn: 'root'
})
export class AreaService {


  constructor(private http: HttpClient) { }

  getAll(): Observable<Area[]> {
    let url = `${environment.baseUrl}areas/get`;
    return this.http.get<Area[]>(url);
  }

  getById(id: any): Observable<any> {
    let url = `${environment.baseUrl}/branch/getById/${id}`;
    return this.http.get<any>(url);
  }

  crear(area: any): Observable<void> {
    let url = `${environment.baseUrl}/branch/create`;
    return this.http.post<void>(url, area);
  }

  eliminar(id: any): Observable<void> {
    let url = `${environment.baseUrl}/branch/delete/${id}`;
    return this.http.delete<void>(url);
  }
}