import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakAuthService } from './keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class KeycloakAuthGuard implements CanActivate {

  constructor(private keycloakAuthService: KeycloakAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.keycloakAuthService.isLoggedIn().then(isLoggedIn => {
      if (!isLoggedIn) {
        this.keycloakAuthService.login();  // Redirect to login if not authenticated
        return false;
      }

      const requiredRoles = route.data['roles'];
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;  // Allow access if no roles are required
      }

      const hasRequiredRole = requiredRoles.some((role: string) => this.keycloakAuthService.hasRole(role));
      if (!hasRequiredRole) {
        this.router.navigate(['/access-denied']);  // Redirect if user lacks roles
        return false;
      }

      return true;
    });
  }
}
