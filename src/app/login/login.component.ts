import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { timeout } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { UtilService } from '../service/util.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  auth_token: string | undefined;
  usuario: any;
  public user : any

  constructor(private router: Router, private auth: AuthService,    private _UTIL_SERVICE_ : UtilService
    ) { }

  hide = true;

  loginForm = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.readLocally()
    this._UTIL_SERVICE_.verificarVentanaActiva()
  }

  login() {
    this.auth.sigin(this.loginForm.value).pipe(
      timeout(5000) // 5000 milisegundos = 5 segundos
    ).subscribe(
      (response: any) => {
        console.log("Obteniendo validacion de servidor -> ", response)
        const token = response.token
        console.log(token)
        if (token) {
          sessionStorage.setItem("auth_token", token)
          this.user = jwtDecode(token)// 
          console.log("USUARIO : : : : : : : ", this.user)
          sessionStorage.setItem("idUser",this.user['usuario']['idUser'])
          sessionStorage.setItem("usuario",this.user['usuario']['usuario'])
          sessionStorage.setItem("rol",this.user['usuario']['nameRole'])
          localStorage.setItem("idUser",this.user['usuario']['idUser'])
          localStorage.setItem("usuario",this.user['usuario']['usuario'])
          localStorage.setItem("rol",this.user['usuario']['nameRole'])




          this.router.navigate(['/dashboardFull'])
        }
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.title,
          text: error.error.message,
          showConfirmButton: false,
          timer: 3000
        });
      }
    );
  }



  readLocally() {
    const token = sessionStorage.getItem('auth_token')
    if (token) {
      this.auth_token = token ? token : ""
      console.log("read locally: ", this.auth_token)
      this.router.navigate(['/dashboardFull'])
      // if (usuario) this.usuario = JSON.parse(usuario)
    }
  }

  readUser(user: any) {
    const role = user.role
    console.log(role)
  }


  // login() {
  //   console.log(this.loginForm.value)
  //   this.auth.login(this.loginForm.value).pipe(
  //   ).subscribe(
  //     (response) => {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'success',
  //         title: 'Cheque registrado',
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //     },
  //     (error) => {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'error',
  //         title: error.error.title,
  //         text: error.error.mesagge,
  //         showConfirmButton: false,
  //         timer: 3000
  //       });
  //     }
  //   );
  // }
}