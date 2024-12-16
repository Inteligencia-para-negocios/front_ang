import { Component, NgModule, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tesoreria',
  templateUrl: './tesoreria.component.html',
  styleUrls: ['./tesoreria.component.css']
})


export class TesoreriaComponent implements OnInit {


  public myChart: any
  public piecito: any
  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.chartTypeCash()
    this.Pie()
  }

  chartTypeCash() {
    const dataL = ['Comida', 'Mantenimiento', 'Electronica']; //conceptos
    var myChart = new Chart("type", {
      type: 'bar',
      data: {
        labels: ['Comida', 'Mantenimiento', 'Electronica'], //conceptos
        datasets: [{
          label: 'Usuarios',
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

  Pie() {
    const dataL = ['Efectivo X', 'Liberado', 'Por liberar'];
    var piecito = new Chart("pie", {
      type: 'pie',
      data: {
        labels: dataL,
        datasets: [{
          label: 'Usuarios',
          data: [12, 19, 7],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)', // Adjusted alpha for gloss effect
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        },
        // layout: {
        //   padding: 5 // Adjust padding for smaller size
        // },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  redirectCorte() {
    this.router.navigate(['cortes-parciales']);
  }

  redirectLibero() {
    this.router.navigate(['liberacion']);
  }

  redirectRebi(){
    this.router.navigate(['revision']);

  }
  redirect4(){
    this.router.navigate(['captura-ajustes']);

  }
  redirect5(){
    this.router.navigate(['detalleFex']);

  }

  redirectC6() {
    this.router.navigate(['revision']);
  }
}
