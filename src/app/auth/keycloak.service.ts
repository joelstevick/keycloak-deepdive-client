import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthService {

  constructor(private keycloakService: KeycloakService) {}

  // Function to log the user in
  login(): Promise<void> {
    return this.keycloakService.login();
  }

  // Function to log the user out
  logout(): Promise<void> {
    return this.keycloakService.logout();
  }

  // Function to get the user's profile information
  async loadUserProfile(): Promise<any> {
    return this.keycloakService.loadUserProfile();
  }

  // Function to check if the user has a specific role
  hasRole(role: string): boolean {
    return this.keycloakService.isUserInRole(role);
  }

  // Check if the user is authenticated
  isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }
}
