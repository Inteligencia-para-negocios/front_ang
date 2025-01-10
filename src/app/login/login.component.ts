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
  constructor(private router: Router, private auth: AuthService, private _UTIL_SERVICE_ : UtilService) { }
  hide = true;

  loginForm = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.readLocally()
    this._UTIL_SERVICE_.verificarVentanaActiva()
  }



  login(){
    console.log("usuarios :", this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe({
      next: (data: any) => {
        const token = data.token
          if (token) {
            sessionStorage.setItem("auth_token", token)
            console.log("ssss", token)
            this.router.navigate(['/dashboardFull']) 
          }
      },
        error(err) {
          console.error(err);
          Swal.fire({
          position: 'center',
          icon: 'error',
          title: err.error.sqlMessage,
          showConfirmButton: false,
          timer: 3000
        }); 
      },
    })
  }



  readLocally() {
    const token = sessionStorage.getItem('auth_token')
    if (token) {
      this.auth_token = token ? token : ""
      console.log("read locally: ", this.auth_token)
      this.router.navigate(['/dashboardFull'])
      // if (usuario) this.usuario = JSON.parse(usuario)
    }else{
      console.log(token)
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
