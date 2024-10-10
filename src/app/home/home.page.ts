import { Component } from '@angular/core';
import { KeycloakService } from '../services/keycloak/keycloak.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private keycloakService: KeycloakService) {}

  logout() {
    this.keycloakService.logout()
  }
}
