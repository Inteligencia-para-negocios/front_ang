import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  tokenD: any


  // guardianes para la verificaciones de sesiones de usaurio dependiendo el usuario para el mejor manejo de seguridad
  //en esta primera version se lanzara con una verificacion basica, seguido de las versiones se iran mejorando los microservicios


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is authenticated
    const token = sessionStorage.getItem('auth_token')
    const requiredRoles: string[] = next.data['roles']; // Obtener los roles requeridos para la ruta
    console.log("::::::Verificando seguridad con guardienes")
    if (token) {
      this.tokenD = jwtDecode(token)
      const hasRequiredRoles = requiredRoles.some(role => requiredRoles.includes(this.tokenD['usuario']['nameRole']));
      console.log("hash -> ",hasRequiredRoles)
      if (hasRequiredRoles) {
        console.log('::::::aceptado')
        return true
      }else{
        this.router.navigate(['/unAuth'])
        console.log('negativo pareja')
        return false
      }
    } else {
      console.log("no tengo token")
      this.router.navigate(['/login']);
      return false
    }
  }
}
