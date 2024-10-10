import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../services/keycloak/keycloak.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  scopes = '';

  constructor(private keycloakService: KeycloakService) {}

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
}
