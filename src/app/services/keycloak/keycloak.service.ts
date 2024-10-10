import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';  // Importing Keycloak directly
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  keycloak: Keycloak; // Using Keycloak instead of KeycloakInstance

  constructor() {
    this.keycloak = new Keycloak({
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    });

    this.init();
  }

  init() {
    return this.keycloak.init({});
  }

  logout() {
    // Implementing the logout function using keycloak.logout()
    this.keycloak.logout({
      redirectUri: window.location.origin, // Adjust this URI based on where you want to redirect
    });
  }
}
