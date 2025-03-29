import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private auth: AuthService) {}

  tokenD: any;

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('auth_token'); // Obtener el token de la sesión
    const requiredRoles: string[] = next.data['roles']; // Obtener los roles requeridos para la ruta
    if (token) {
      try {
        this.tokenD = jwtDecode(token); // Decodificar el token
        const userRole = this.tokenD['rolUser']; // Obtener el rol del usuario desde el token
        // Verificar si el usuario tiene uno de los roles requeridos
        const hasRequiredRoles = requiredRoles.includes(userRole);
        if (hasRequiredRoles) 
          return true;
        else {
          this.router.navigate(['/unAuth']); 
          return false;
        }
      } catch (error) {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']); // Redirigir si no hay token
      return false;
    }
  }
}
