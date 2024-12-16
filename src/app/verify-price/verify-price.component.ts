import { Component, HostListener } from '@angular/core';
import { UtilService } from '../service/util.service';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-price',
  templateUrl: './verify-price.component.html',
  styleUrls: ['./verify-price.component.css']
})




export class VerifyPriceComponent {

  private inactivityTimer: any;
  private codeReader!: Observable<KeyboardEvent>;
  barcodeData: string = '';
  scanning: boolean = false;
  public precio = '';
  public nombre = '';
  public naturaleza = '';
  public codigoLeido = ''
  constructor(private service: UtilService, private router: ActivatedRoute, private route : Router
  ) {
   
    this.codeReader = fromEvent<KeyboardEvent>(window, 'keydown').pipe(debounceTime(1000));
  }

  ngOnInit() {
    this.service.healt().subscribe({
      next: (data: any) => {
        console.log(data)
      }
    })
    this.iniciarTemporizador();
    this.setupInactivityDetection();
    this.router.params.subscribe(params => {
      const parametro = params['parametro'];
      this.processBarcodeData(parametro)
      // Utiliza 'parametro' en tu componente
      console.log('Parámetro recibido:', parametro);
    });
  }

  ngOnDestroy() {
    clearTimeout(this.inactivityTimer);
  }


  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
   
    this.reiniciarTemporizador();
    if (event.key === 'Enter' || event.key === 'ArrowDown' || event.key === 'AltTab') {
      if (this.scanning) {
        // if(this.barcodeData.length > this.codigoLeido.length){
        //     console.log("viene de publicidad")
        // }else{
        //   console.log("viene de pantalla de verificador")
        // }
        this.processBarcodeData(this.barcodeData);
        this.barcodeData = '';
        this.scanning = false;
      }
    } else {
      this.barcodeData += event.key;
      this.scanning = true;
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
    }, 4000); // 30000 ms = 30 segundos (ajusta el tiempo según tus necesidades).
  }

  private reiniciarTemporizador() {
    clearTimeout(this.inactivityTimer);
    this.iniciarTemporizador();
  }

  private redirigirAPublicidad() {
    console.log('Redirigiendo a la pantalla de publicidad');
    this.route.navigate(['/publicidad'])
  }

  processBarcodeData(data: string) {
    const processedCode = data.replace(/Shift/g, '');

    const contieneLetras = /[a-zA-Z]/.test(processedCode);
    const contieneNumeros = /^[0-9]+$/.test(processedCode);
    console.log("------------>", processedCode)
    if (contieneLetras) {
      var objet = {
        codigoPab: processedCode,
        codigoSust: ''
      }
      this.service.verificador(objet).subscribe({
        next: (data: any) => {
          console.log(data)
          if (data.length > 0) {
            this.nombre = data[0]['NOMBREVENTA']
            this.precio = data[0]['PRECIO_CON_IVA']
            this.naturaleza = data[0]['NATURALEZA']
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error',
              text: 'Producto no encontrado',
              showConfirmButton: false,
              timer: 1500
            });
            this.nombre = ''
            this.precio = ''
          }
        }
      })
    } else if (contieneNumeros) {
      var objet = {
        codigoPab: '',
        codigoSust: processedCode
      }
      this.service.verificador(objet).subscribe({
        next: (data: any) => {
          if (data.length > 0) {
            this.nombre = data[0]['NOMBREVENTA']
            this.precio = data[0]['PRECIO_CON_IVA']
            this.naturaleza = data[0]['NATURALEZA']

          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error',
              text: 'Producto no encontrado',
              showConfirmButton: false,
              timer: 1500
            });
            this.nombre = ''
            this.precio = ''
          }
        }
      })
    } else {
      console.log("preceedcode contiene caracteres especiales o una combinación de letras y números.");
    }
    //this.service.verificador()
    console.log("====>", processedCode)
  }
}
