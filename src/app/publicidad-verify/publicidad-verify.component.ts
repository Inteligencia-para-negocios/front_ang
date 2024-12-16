import { Component, HostListener } from '@angular/core';
import { UtilService } from '../service/util.service';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-publicidad-verify',
  templateUrl: './publicidad-verify.component.html',
  styleUrls: ['./publicidad-verify.component.css']
})
export class PublicidadVerifyComponent {
  private inactivityTimer: any;
  private codeReader!: Observable<KeyboardEvent>;
  barcodeData: string = '';
  scanning: boolean = false;
  public precio = '';
  public nombre = '';
  public naturaleza = '';

  constructor(private service: UtilService, private router: Router
  ) {
    this.codeReader = fromEvent<KeyboardEvent>(window, 'keydown').pipe(debounceTime(1000));
  }

  ngOnInit() {
    this.iniciarTemporizador();
    this.setupInactivityDetection();
  }

  ngOnDestroy() {
    clearTimeout(this.inactivityTimer);
  }

  @HostListener('window:keydown', ['$event'])

  handleKeyboardEvent(event: KeyboardEvent) {
    // Verifica si la entrada proviene del lector de códigos de barras (puede depender de la configuración específica de tu lector).
    if (event.key === 'Enter') {
      this.processBarcodeData(this.barcodeData);
      this.barcodeData = ''; // Reinicia el buffer para el siguiente escaneo.
    } else {
      this.barcodeData += event.key;
    }
  }

  private setupInactivityDetection() {
    fromEvent(document, 'mousemove').subscribe(() => {
      this.reiniciarTemporizador();
    });
  }

  private iniciarTemporizador() {
    this.inactivityTimer = setTimeout(() => {
      this.redirigirAPublicidad();
    },20000); // 30000 ms = 30 segundos (ajusta el tiempo según tus necesidades).
  }

  private reiniciarTemporizador() {
    clearTimeout(this.inactivityTimer);
    this.iniciarTemporizador();
  }

  private redirigirAPublicidad() {
    console.log('Redirigiendo a la pantalla de publicidad');
    // this.router.navigate(['/verificador'])

    // Agrega aquí la lógica para redirigir a la pantalla de publicidad.
  }

  processBarcodeData(data: string) {
    this.router.navigate(['/verificador',data])
  //   const processedCode = data.replace(/Shift/g, '');

  //   const contieneLetras = /[a-zA-Z]/.test(processedCode);
  //   const contieneNumeros = /^[0-9]+$/.test(processedCode);
  //   console.log("------------>", processedCode)
  //   if (contieneLetras) {
  //     console.log("es letra")
  //     var objet = {
  //       codigoPab: processedCode,
  //       codigoSust: ''
  //     }
  //     this.service.verificador(objet).subscribe({
  //       next: (data: any) => {
  //         console.log(data)
  //         if (data.length > 0) {
  //           this.nombre = data[0]['NOMBREVENTA']
  //           this.precio = data[0]['PRECIO_CON_IVA']
  //           this.naturaleza = data[0]['NATURALEZA']
  //         } else {
  //           Swal.fire({
  //             position: 'center',
  //             icon: 'error',
  //             title: 'Error',
  //             text: 'Producto no encontrado',
  //             showConfirmButton: false,
  //             timer: 1500
  //           });
  //           this.nombre = ''
  //           this.precio = ''
  //         }
  //       }
  //     })
  //   } else if (contieneNumeros) {
  //     console.log("es numero")
  //     var objet = {
  //       codigoPab: '',
  //       codigoSust: processedCode
  //     }
  //     this.service.verificador(objet).subscribe({
  //       next: (data: any) => {
  //         if (data.length > 0) {
  //           this.nombre = data[0]['NOMBREVENTA']
  //           this.precio = data[0]['PRECIO_CON_IVA']
  //           this.naturaleza = data[0]['NATURALEZA']

  //         } else {
  //           Swal.fire({
  //             position: 'center',
  //             icon: 'error',
  //             title: 'Error',
  //             text: 'Producto no encontrado',
  //             showConfirmButton: false,
  //             timer: 1500
  //           });
  //           this.nombre = ''
  //           this.precio = ''
  //         }
  //       }
  //     })
  //   } else {
  //     console.log("preceedcode contiene caracteres especiales o una combinación de letras y números.");
  //   }
  //   //this.service.verificador()
  //   console.log("====>", processedCode)
  }
}
