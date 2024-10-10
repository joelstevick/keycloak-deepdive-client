import { Component, OnInit } from '@angular/core';
import { KeycloakService as AngularKeycloakService } from 'keycloak-angular'; // Import Keycloak service from keycloak-angular
import { KeycloakService } from '../services/keycloak/keycloak.service'; // Your existing Keycloak service
import axios from 'axios'; // Import Axios
import { environment } from 'src/environments/environment'; // Import environment

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  scopes = '';

  constructor(
    private keycloakService: KeycloakService, // Your existing Keycloak service
    private angularKeycloakService: AngularKeycloakService // Keycloak Angular Service
  ) {}

  async ngOnInit() {
    this.scopes = await this.keycloakService.getScopes();
  }

  logout() {
    this.keycloakService.logout();
  }

  requestReadScope() {
    this.keycloakService.requestScopes(['read-access']);
  }

  requestWriteScope() {
    this.keycloakService.requestScopes(['write-access']);
  }

  requestAllScope() {
    this.keycloakService.requestScopes(['read-access', 'write-access']);
  }

  async tryReadEndpoint() {
    try {
      const token = await this.angularKeycloakService.getToken(); // Get token from Keycloak Angular Service
      const response = await axios.get(`${environment.api_url}/read`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });

      console.log('Read endpoint response:', response.data);
    } catch (error) {
      console.error('Error calling read endpoint:', error);
    }
  }

  async tryWriteEndpoint() {
    try {
      const token = await this.angularKeycloakService.getToken(); // Get token from Keycloak Angular Service
      const response = await axios.post(`${environment.api_url}/write`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });

      console.log('Write endpoint response:', response.data);
    } catch (error) {
      console.error('Error calling write endpoint:', error);
    }
  }
}
