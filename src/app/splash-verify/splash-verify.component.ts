import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-splash-verify',
  templateUrl: './splash-verify.component.html',
  styleUrls: ['./splash-verify.component.css']
})
export class SplashVerifyComponent implements OnInit {

  constructor(
    private router: Router

  ){}

  ngOnInit(): void {
    this.redirect()
  }

  redirect() {
    setTimeout(() => {
      this.router.navigate(['/verificador'])
    }, 2500)
  }
}
