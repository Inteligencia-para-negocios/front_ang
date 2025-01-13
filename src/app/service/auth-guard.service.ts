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
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = sessionStorage.getItem('auth_token');  // Obtener el token de la sesión
    const requiredRoles: string[] = next.data['roles'];  // Obtener los roles requeridos para la ruta
    console.log("::::::Verificando seguridad con guardienes");
    if (token) {
      try {
        this.tokenD = jwtDecode(token);  // Decodificar el token
        const userRole=this.tokenD['usuario_rol']==undefined?this.tokenD['puesto']:this.tokenD['usuario_rol'];  // Obtener el rol del usuario desde el token
        // Verificar si el usuario tiene uno de los roles requeridos
        console.log("este es el rol", userRole);
        
        const hasRequiredRoles = requiredRoles.includes(userRole);

        console.log("hasRequiredRoles -> ", hasRequiredRoles);

        if (hasRequiredRoles) {
          console.log('::::::aceptado');
          return true;
        } else {
          console.log('Rol no autorizado, redirigiendo...');
          this.router.navigate(['/unAuth']);  // Redirigir si no tiene el rol requerido
          return false;
        }
      } catch (error) {
        console.error('Error al decodificar el token', error);
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      console.log("no tengo token");
      this.router.navigate(['/login']);  // Redirigir si no hay token
      return false;
    }
  }
}
