import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login';
import { HomeComponent } from './Components/home';
import { SignupComponent } from './Components/signup';
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  
  { path: '', component: HomeComponent }
];
