import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  constructor(
      private http : HttpClient,
      private auth : AuthService
    ) { }
    
    async getAllClasificaciones(idpartida: string ) {
      const partidas = {
        partida : idpartida
      }
      const headers = this.auth.getHeaders();
      return this.http.post(`${environment.baseUrl}Clasificaciones/porPartida`, partidas, { headers });
    }
    
}
