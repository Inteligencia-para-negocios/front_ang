import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from '../services/auth.service';

interface TokenPayload {
  permissions: string[];
  // Puedes agregar otros campos que esperes del token
}

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const token = localStorage.getItem('auth_token');
    const requiredPermissions: string[] = route.data['permissions'] || [];

    // Si no hay token, redirigir al login con returnUrl
    if (!token) {
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }

    try {
      const payload: TokenPayload = jwtDecode(token);

      // Validar que el token tenga la propiedad de permisos y sea un arreglo
      if (!payload.permissions || !Array.isArray(payload.permissions)) {
        throw new Error('Token inválido: permisos no definidos');
      }

      // Verificar si el usuario tiene al menos uno de los permisos requeridos
      const hasPermission = requiredPermissions.some(permission => payload.permissions.includes(permission));

      // Si el usuario tiene el permiso, se le permite acceder, de lo contrario se redirige a la página de acceso denegado
      return hasPermission? true: this.router.createUrlTree(['/unAuth'], { queryParams: { returnUrl: state.url } });
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
  }
}
