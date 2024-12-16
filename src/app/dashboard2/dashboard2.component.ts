import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component {
  public chartActyviti: any;
  public chartType: any;

  constructor(private router:Router){ }

  ngOnInit(): void {
    this.chartActyvitiCash();
    this.chartTypeCash();
  }

  chartActyvitiCash() {

    this.chartActyviti = new Chart("actyviti", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Saldo",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'rgba(16, 82, 119, .15)',
            borderColor: 'rgba(16,82 ,119 ,100)',
            fill: true,
            tension: 0.5,
          },
          {
            label: "Remanente",
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
    const dataL = ['Comida', 'Mantenimiento', 'Electronica'];
    var myChart = new Chart("type", {
      type: 'bar',
      data: {
        labels: ['Comida', 'Mantenimiento', 'Electronica'],
        datasets: [{
          label:'Usuarios',
          data: [12, 19, 7],
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
