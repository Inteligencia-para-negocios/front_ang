import { Component } from '@angular/core';
import { faHouse, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  usuarioOn: String | null | undefined
  role: string | null | undefined;
  constructor(
    private _router : Router,
    private auth: AuthService
    ){}
    
    
  isMenuOpen: boolean = false;


  ngOnInit(){
    
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  home() {
    this._router.navigate(['/login'])
  }
  
  getRole(){
    this.role = sessionStorage.getItem('rol') || localStorage.getItem('rol')
    console.log(" R ------> ", this.role)
    this.usuarioOn = sessionStorage.getItem('usuario') || localStorage.getItem('usuario')
    console.log('U ------>', this.usuarioOn)
  }

  
  verify(){
    
  }

  async logOut(){
    await this.auth.logout()
    this.home()
  }
}
