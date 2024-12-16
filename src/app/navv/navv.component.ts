import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navv',
  templateUrl: './navv.component.html',
  styleUrls: ['./navv.component.css']
})
export class NavvComponent implements OnInit {
  isMenuOpen = false;

  usuarioOn: String | null | undefined
  role: string | null | undefined;

  ngOnInit(): void {
      this.getRole()
  }
  getRole(){
    this.role = sessionStorage.getItem('rol') || localStorage.getItem('rol')
    console.log(" R ------> ", this.role)
    this.usuarioOn = sessionStorage.getItem('usuario') || localStorage.getItem('usuario')
    console.log('U ------>', this.usuarioOn)
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
