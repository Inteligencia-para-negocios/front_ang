import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GastoRecurrenteService {
  constructor(
    private http: HttpClient,
    private utils: UtilService,
    private auth: AuthService
  ) {}

  createGasto(obj: any) {
    const headers = this.auth.getHeaders();
    const url = `${environment.baseUrl}Gasto/Recurrente/`;
    return this.http.post(url, obj, { headers });
  }
}
