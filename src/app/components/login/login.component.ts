import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { timeout } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  auth_token: string | undefined;
  usuario: any;
  public user: any;
  constructor(
    private router: Router,
    private auth: AuthService,
    private _UTIL_SERVICE_: UtilService
  ) {}
  hide = true;

  loginForm = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.readLocally();
    this._UTIL_SERVICE_.verificarVentanaActiva();
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe({
      next: (data: any) => {
        const token = data.token;
        if (token) {
          localStorage.setItem('auth_token', token);
          this.router.navigate(['/dashboardFull']);
        }
      },
      error(err) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: err.error.sqlMessage,
          showConfirmButton: false,
          timer: 3000,
        });
      },
    });
  }

  async logOut() {
    await this.auth.logout();
  }

  readLocally() {
    const token = this.auth.getToken();
    if (token) {
      this.auth_token = token ? token : '';
      this.router.navigate(['/dashboardFull']);
      // if (usuario) this.usuario = JSON.parse(usuario)
    } else {
      console.log(token);
    }
  }
}
