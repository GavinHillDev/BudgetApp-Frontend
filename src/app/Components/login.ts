import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet, Router } from '@angular/router';
//import { LoginResponse } from './Components/loginresponse';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { error } from 'console';
@Component({
  selector: 'login',
  standalone : true,
  imports: [CommonModule,RouterOutlet, ReactiveFormsModule],
  templateUrl: '../Html/login.html',
  //styleUrl: './app.css'
  
})

export class LoginComponent {
  form = new FormGroup({
    Username: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl('')
  });
  private router = inject(Router);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5113/api/Users/login';
  noUser = false; //Alert For SignUpCheck
  userExistsInput = ''; //Input Signup
  validateLogin() {
    const email = this.form.get('Email')?.value;
    const entereduserInfo = {
      Email: this.form.get('Email')?.value,
      Password: this.form.get('Password')?.value
    }
    this.http.post(this.apiUrl, entereduserInfo).subscribe({
      next: (res: any) => {
        localStorage.setItem("token", res.token)
        console.log(res.token)
        this.dashboardNavigation()
      }
      , error: err => console.error('Failed to Login', err)
    })
    //t@t.com - p 12
  }
  dashboardNavigation() {
    this.router.navigate(['/dashboard']);
  }
}
