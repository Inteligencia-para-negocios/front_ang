import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { UtilService } from '../service/util.service';
import { AuthService } from '../service/auth.service';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  public chartActyviti: any;
  public chartType: any;
  completed:any= 'completed';
  notCompleted:any = 'not-completed'
  

  constructor(private router:Router,    private _UTIL_SERVICE_ : UtilService){ }

  ngOnInit(): void {
    this.chartActyvitiCash();
    this.chartTypeCash();
    this._UTIL_SERVICE_.verificarVentanaActiva()
  }
  chartActyvitiCash() {

    this.chartActyviti = new Chart("actyviti", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Gastos",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'rgba(16, 82, 119, .15)',
            borderColor: 'rgba(16,82 ,119 ,100)',
            fill: true,
            tension: 0.5,
          },
          {
            label: "Obras",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            borderColor: 'rgba(66, 47, 138,.87)',
            fill: false,
            tension: 0.5,
          },
        ]
      },
      options: {
        aspectRatio: 5
      }
    });
  }

  chartTypeCash() {
    const dataL = ['Comida', 'Mantenimiento', 'Electronica']; //conceptos
    var myChart = new Chart("type", {
      type: 'bar',
      data: {
        labels: ['Comida', 'Mantenimiento', 'Electronica'], //conceptos
        datasets: [{
          label:'Usuarios',
          data: [12, 19, 7], // count por conceptos
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  oco(){
    var options = {
      series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 12, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
      chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
    };
  }

  reCapt(){
    this.router.navigate(['/captura-cheque'])
  }
  reAuth(){
    this.router.navigate(['/auth-gastos'])
  }
  reGast(){
    this.router.navigate(['/view-gastos'])
  }


}

