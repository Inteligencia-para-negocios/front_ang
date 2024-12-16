import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}users/get`);
  }

  // get_all(){
  //   return this.http.get(`${environment.baseUrl}branch/get`)
  // }

  // getById(id:any): Observable<any>{
  //   let url = `${environment.baseUrl}/branch/getById/${id}`;
  //   return this.http.get<any>(url);
  // }

  // crear(sucursal:any): Observable<void>{
  //   let url = `${environment.baseUrl}/branch/create`;
  //   return this.http.post<void>(url,sucursal);
  // }

  // eliminar(id:any):Observable<void>{
  //   let url = `${environment.baseUrl}/branch/delete/${id}`;
  //   return this.http.delete<void>(url);
  // }
}