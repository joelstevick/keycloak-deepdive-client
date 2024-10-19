import { Component, OnInit } from '@angular/core';
import { KeycloakService as AngularKeycloakService } from 'keycloak-angular'; // Import Keycloak service from keycloak-angular
import { KeycloakService } from '../services/keycloak/keycloak.service'; // Your existing Keycloak service
import axios from 'axios'; // Import Axios
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common'; // Import CommonModule

function formatOutput(str: string) {
  return JSON.stringify(str, null, 2);
}

@Component({
  selector: 'app-home',
  standalone: true, // Indicate that this is a standalone component
  imports: [CommonModule], // Import CommonModule
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  scopes = '';
  hasError = false;
  responseData = '';

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
      this.hasError = false;

      const token = await this.angularKeycloakService.getToken(); // Get token from Keycloak Angular Service
      const response = await axios.get(`${environment.api_url}/read`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });

      this.responseData = formatOutput(response.data);
    } catch (error: any) {
      this.responseData = error;
      this.hasError = true;
    }
  }

  async tryWriteEndpoint() {
    try {
      this.hasError = false;

      const token = await this.angularKeycloakService.getToken(); // Get token from Keycloak Angular Service
      const response = await axios.post(`${environment.api_url}/write`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });

      this.responseData = formatOutput(response.data);
    } catch (error: any) {
      this.responseData = error;
      this.hasError = true;
    }
  }
}
