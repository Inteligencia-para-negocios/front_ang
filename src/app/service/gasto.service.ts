import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(
    private http: HttpClient,
    private utils: UtilService,
    private auth: AuthService
  ) {
   }

  getGastos(): Observable<any[]>{
    const headers = this.auth.getHeaders()
    const url = `${environment.baseUrl}Gastos/`;
    return this.http.get<any[]>(url,{headers});
  }

  createGasto(obj:any){
    const headers = this.auth.getHeaders()
    const url = `${environment.baseUrl}Gastos/`;
    return this.http.post(url,obj,{headers});
  }

  updateGasto(obj:any){
    const headers = this.auth.getHeaders();
    const url = `${environment.baseUrl}Gastos/`
    return this.http.put(url,obj,{headers});
  }

  authGasto(obj:any){
    const headers = this.auth.getHeaders();
    const url = `${environment.baseUrl}Gastos/`
    return this.http.patch(url,obj,{headers})
  }
}
