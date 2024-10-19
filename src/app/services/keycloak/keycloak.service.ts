import { Injectable } from '@angular/core';
import { KeycloakService as AngularKeycloakService } from 'keycloak-angular'; // Use Angular Keycloak Service
import { decodeJwt } from 'jose';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  constructor(private keycloakService: AngularKeycloakService) {} // Inject Angular Keycloak Service

  logout() {
    this.keycloakService.logout(window.location.origin);
  }

  async requestScopes(scopes: string[]) {
    try {
      await this.keycloakService.login({
        scope: scopes.join(' '),
        prompt: 'consent',
        redirectUri: 'http://localhost:8100',
      });
      console.log('Consent screen displayed, scopes requested:', scopes);
    } catch (error) {
      console.error('Error requesting scopes:', error);
    }
  }

  async getScopes() {
    const token = await this.keycloakService.getToken(); // Use getToken() method from Angular service
    if (!token) {
      console.error('Token is not available');
      return 'token not available';
    }

    const decodedToken = decodeJwt(token);
    const scopes = decodedToken['scope'] || '';

    return scopes as string;
  }
}
