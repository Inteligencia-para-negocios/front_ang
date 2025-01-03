import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Puesto, Presupuesto, Status } from 'src/models/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private gasto: any;
  private codigo: string | undefined;

  private ventanaActual: Window | null = null;
  private ventanaActualID: string | null = null;
  private ventanasAbiertas: Window[] = [];

  constructor(private http: HttpClient) {
    this.ventanasAbiertas.push(window);

    // Escuchar eventos para manejar el cierre de ventanas
    window.addEventListener('beforeunload', () => {
      this.removerVentana(window);
    });
  }


  private removerVentana(ventana: Window): void {
    const index = this.ventanasAbiertas.indexOf(ventana);
    if (index !== -1) {
      this.ventanasAbiertas.splice(index, 1);
    }
  }

  // Función para verificar si ya existe una ventana activa de la aplicación
  verificarVentanaActiva(): void {
    console.log("estoy evaluando",this.ventanasAbiertas)
    
    if (this.ventanasAbiertas.length > 1) {
      // Mostrar una alerta o mensaje para informar al usuario
      alert('Ya existe una ventana activa de la aplicación.');

      // Redirigir al usuario a la ventana activa
      this.ventanasAbiertas[0].focus();
    }
  }

  verificador(objet: any): Observable<any[]>{
    let url = `${environment.baseUrl}checador/get`;
    return this.http.post<any[]>(url,objet);
  }
  healt(): Observable<any[]>{
    let url = `${environment.baseUrl}checador/healt`;
    return this.http.get<any[]>(url);
  }

  getById(id: any): Observable<Status[]> {
    let url = `${environment.baseUrl}status/getById/${id}`;
    return this.http.get<Status[]>(url);
  }

  create(revolvente: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}revolvente/create`, revolvente)
  }

  crear(presupuesto: any): Observable<Presupuesto[]> {
    let url = `${environment.baseUrl}presp/create`;
    return this.http.post<Presupuesto[]>(url, presupuesto);
  }
  getList(): Observable<Presupuesto[]> {
    let url = `${environment.baseUrl}presp/getList`;
    return this.http.get<Presupuesto[]>(url);
  }
  getPuestos(): Observable<Puesto[]> {
    let url = `${environment.baseUrl}lib/puestos`;
    return this.http.get<Puesto[]>(url);
  }
  getStatus(): Observable<Status[]> {
    let url = `${environment.baseUrl}status/get`;
    return this.http.get<Status[]>(url);
  }

  getCapt(): Observable<any[]> {
    let url = `${environment.baseUrl}lib/capt`;
    return this.http.get<any[]>(url);
  }


  getStatus1(): Observable<Status[]> {
    let url = `${environment.baseUrl}status/get2`;
    return this.http.get<Status[]>(url);
  }

  leerExel(ruta: any): Observable<any[]> {
    let url = `${environment.baseUrl}doc/leerExcel`;
    return this.http.post<any[]>(url, ruta);
  }

  setCodigo(data: string) {
    this.codigo = data;
  }

  getCodigo(): any {
    return this.codigo;
  }

  setGasto(gasto: any) {
    this.gasto = gasto;
  }

  getGasto(): any {
    return this.gasto;
  }

  // generarIdentificadorUnico(): string {
  //   // Implementa la generación de un identificador único aquí
  //   // Puede ser un GUID o cualquier otro método que prefieras
  //   // Por ejemplo, usando la fecha y hora actual:
  //   return `ventana_${Date.now()}`;
  // }

  // asignarIdentificadorVentanaActual(): void {
  //   if (!this.ventanaActualID) {
  //     this.ventanaActualID = this.generarIdentificadorUnico();
  //     this.ventanaActual = window;
  //   }
  // }

  // obtenerIdentificadorVentanaActual(): string | null {
  //   return this.ventanaActualID;
  // }

  // obtenerVentanaActual(): Window | null {
  //   return this.ventanaActual;
  // }

}
