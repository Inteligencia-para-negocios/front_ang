import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/interface';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  User: any

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}users/get`);
  }

  getUser(){
    const token = sessionStorage.getItem('auth_token');
    if(token){
      this.User = jwtDecode(token)
      const idUser = this.User
      return idUser
    }else{
      return false
    }
  }

  //permisos segun el usuario
  getPermisos(){

  }

  getVistas(){}

  getUsuarioDetalle(){}

 
}