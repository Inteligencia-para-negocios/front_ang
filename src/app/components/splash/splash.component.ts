import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit{
  
  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    this.login()
  }

  login() {
    // setTimeout(() => {
    //   this.router.navigate(['/login'])
    // }, 2500)
   
  }

}
