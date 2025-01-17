import { Component, NgModule, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {
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
            'rgba(0, 50, 83, 0.2)',  // Azul claro
            'rgba(30, 144, 255, 0.2)',  // Azul Dodger
            'rgba(100, 149, 237, 0.2)', // Azul de acero
            'rgba(70, 130, 180, 0.2)',  // Azul acero claro
            'rgba(0, 191, 255, 0.2)',   // Azul profundo
            'rgba(0, 0, 255, 0.2)'      // Azul puro
          ],
          borderColor: [
            'rgb(0, 50, 83)',       // Azul claro
            'rgb(30, 144, 255)',       // Azul Dodger
            'rgb(100, 149, 237)',      // Azul de acero
            'rgb(70, 130, 180)',       // Azul acero claro
            'rgb(0, 191, 255)',        // Azul profundo
            'rgb(0, 0, 255)'           // Azul puro
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
            'rgba(99, 224, 255, 0.38)', // Adjusted alpha for gloss effect
            'rgba(54, 162, 235, 0.5)',
            'rgba(86, 193, 255, 0.5)'
          ],
          borderColor: [
            'rgb(99, 122, 255)',
            'rgba(54, 162, 235, 1)',
            'rgb(86, 165, 255)'
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


  redirectNew() {
    this.router.navigate(['create']);
  }

  redirectAsig(){
    this.router.navigate(['asignacion']);

  }
 
}
