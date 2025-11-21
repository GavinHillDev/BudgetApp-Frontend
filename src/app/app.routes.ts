import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login';
import { HomeComponent } from './Components/home';
import { SignupComponent } from './Components/signup';
import { DashboardComponent } from './Components/dashboard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  { path: '', component: HomeComponent }
];
