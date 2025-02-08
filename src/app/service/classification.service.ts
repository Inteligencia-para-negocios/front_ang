import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';


@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  constructor(
      private http : HttpClient,
      private auth : AuthService,
      private utils : UtilService
    ) { }
    
    async getAllClasificaciones(objet: any ) {

      const headers = this.utils.crearCabezeraCom(objet);
      return this.http.get(`${environment.baseUrl}Clasificaciones/porPartida`, headers);
    }
    
}
