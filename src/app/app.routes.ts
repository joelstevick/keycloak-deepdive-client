import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppAuthGuard } from './auth/guards/app-auth.guard'; // Import your guard

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AppAuthGuard],  // Protect the home route
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    redirectTo: 'home',
  },
];
