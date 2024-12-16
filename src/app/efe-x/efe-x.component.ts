import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import Utils from 'chart.js/auto'
import { CorteService } from '../service/corte.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-efe-x',
  templateUrl: './efe-x.component.html',
  styleUrls: ['./efe-x.component.css']
})

export class EfeXComponent implements OnInit {
  public chartActyviti: any;
  public corte: any[] = []
  public efeX: any[] = []
  public meses: string[] = []
  estadoCheck: string = 'activo'; // Estado inicial, puedes cambiarlo según tus necesidades

  notBloqued: any = 'status completed';
  process: any = 'status process';
  isBloqued: any = 'status closed'

  constructor(
    private _CORTE_SERVICE_: CorteService,
    private _ROUTE_: Router
  ) { }
 
  redirecTo() {
    this._ROUTE_.navigate(['revision'])
  }
  redirecTo2() {
    this._ROUTE_.navigate(['detalleFex'])
  }

  ngOnInit(): void {
    this.getCorte()
    console.log(this.meses)
    console.log(this.efeX)
  }

  getCorte() {
    this._CORTE_SERVICE_.getAll().subscribe({
      next: (data: any) => {
        console.log(data)
        this.corte = data
        this.destructureCorte()
      }
    })
  }

  destructureCorte() {
    // Make sure 'this.meses' is defined and initialized as an array
    this.meses = this.meses || [];
    console.log("que andas haciendo bola de vrga")
    console.log(this.corte)
    for (let index = 0; index < this.corte.length; index++) {
      const fecha = this.corte[index]['emicionCorte'];
      const monto = this.corte[index]['efectivoX']
      var fechaFormat = this.formatFecha(fecha)
      this.meses.push(fechaFormat)
      this.efeX.push(monto)
    }
    this.chartActyvitiCash()
  }

  getMaxValue(array: any) {
    return Math.max(...array);
  }

  getMinValue(array: any) {
    return Math.min(...array);
  }

  getMedianValue(array: any[]): any {
    const sortedArray = array.slice().sort((a: number, b: number) => a - b);
    const middle = Math.floor(sortedArray.length / 2);

    if (sortedArray.length % 2 === 0) {
      return (sortedArray[middle - 1] + sortedArray[middle]) / 2;
    } else {
      return sortedArray[middle];
    }
  }

  formatMonto(monto: number): string {
    return `$${monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

  formatFecha(fechaISO: string): string {
    const parsedDate = new Date(fechaISO);
    const day = parsedDate.getUTCDate().toString().padStart(2, '0');
    const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    const monthIndex = parsedDate.getUTCMonth();
    const monthName = monthNames[monthIndex];
    const year = parsedDate.getUTCFullYear().toString();
    return `${day}/${monthName}/${year}`;
  }

  chartActyvitiCash() {
    const maximo = this.getMaxValue(this.efeX);
    const minimo = this.getMinValue(this.efeX);
    const mediana = this.getMedianValue(this.efeX);
    this.chartActyviti = new Chart("actyviti", {
      type: 'line',
      data: {
        labels: this.meses,
        datasets: [
          {
            label: "Efectivo X",
            data: this.efeX,
            backgroundColor: 'rgba(16, 82, 119, .15)',
            borderColor: 'rgba(16, 82, 119, 1)',
            fill: true,
            tension: 0.0,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHitRadius: 10,
            pointBackgroundColor: function (context) {
              var value = context.parsed.y;
              if (value < 400000) {
                return 'red';
              }
              else {
                return 'green';
              }
            },
          },
        ]
      },
      options: {
        aspectRatio: 5,
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Estado gráfico del efectivo X'
          }
        }
      }
    });
  }

  estadosTarjetas: { [key: number]: string } = {};

  checker(idGastoRev: number, nuevoEstado: string) {
    this.estadosTarjetas[idGastoRev] = nuevoEstado;
    if (nuevoEstado === 'inactiva') {
      console.log(`La tarjeta con idGastoRev ${idGastoRev} cambió a activa`);
      // const Swa = Swal.mixin({
      //   customClass: {
      //     confirmButton: 'btn btn-success',
      //     cancelButton: 'btn btn-danger'
      //   },
      //   buttonsStyling: false
      // })
      // Swal.fire({
      //   title: 'Are you sure?',
      //   text: "You won't be able to revert this!",
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonText: 'Yes, delete it!',
      //   cancelButtonText: 'No, cancel!',
      //   reverseButtons: true
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     Swal.fire(
      //       'Deleted!',
      //       'Your file has been deleted.',
      //       'success'
      //     ),
      //     console.log(`La tarjeta con idGastoRev ${idGastoRev} cambió a inactiva`);
      //   } else if (
      //     /* Read more about handling dismissals below */
      //     result.dismiss === Swal.DismissReason.cancel
      //   ) {
      //     Swal.fire(
      //       'Cancelled',
      //       'Your imaginary file is safe :)',
      //       'error'
      //     ),
      //     
      //   }
      // })

    } else {
      console.log(`La tarjeta con idGastoRev ${idGastoRev} cambió a inactiva`);
    }
    console.log("Estado actual >>>>>", this.estadosTarjetas[idGastoRev]);
  }
  chartActivityFull() {
    const ultimaFecha = this.meses[this.meses.length - 1];

    // Filtrar las fechas para incluir solo la última semana completa
    const fechasUltimaSemana = this.meses.filter(fecha => {
      const fechaActual = new Date(fecha);
      const ultimaFechaSemana = new Date(ultimaFecha);
      ultimaFechaSemana.setDate(ultimaFechaSemana.getDate() - 6); // Retroceder 6 días para obtener una semana completa
      return fechaActual >= ultimaFechaSemana && fechaActual <= new Date(ultimaFecha);
    });

    this.chartActyviti = new Chart("actyviti", {
      type: 'line',
      data: {
        labels: fechasUltimaSemana, // Usar las fechas filtradas
        datasets: [
          {
            label: "Efectivo X",
            data: this.efeX.slice(-fechasUltimaSemana.length), // Usar los datos correspondientes
            backgroundColor: 'rgba(16, 82, 119, .15)',
            borderColor: 'rgba(16, 82, 119, 1)',
            fill: true,
            tension: 0.0,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHitRadius: 10,
            pointBackgroundColor: function (context) {
              var value = context.parsed.y;
              if (value < 400000) {
                return 'red';
              } else {
                return 'green';
              }
            },
          },
        ]
      },
      options: {
        aspectRatio: 5,
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Estado gráfico del efectivo X'
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Fechas de la última semana completa'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Valor'
            }
          }
        }
      }
    });
  }
}