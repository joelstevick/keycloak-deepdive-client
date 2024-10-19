import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { keycloakAuthGuard } from './app-auth.guard';

describe('keycloakAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => keycloakAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
