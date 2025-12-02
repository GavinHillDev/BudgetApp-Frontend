import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterOutlet, Router } from '@angular/router';
//import { LoginResponse } from './Components/loginresponse';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { error } from 'console';
import { AuthService, User } from '../Services/login.service';

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
  loggeduser: User | null = null;
  username: string = "";
  email: string = "";
  user = {
    username: "",
    id: 0,
    email: ""
  };
  constructor(private authService: AuthService) { }

  ngOnInit() {
     
    this.authService.user$.subscribe(u => {
      this.loggeduser = u;
      
      if (this.loggeduser != null) {
        console.log("Navigated back to Dashboard")
        this.router.navigate(['/dashboard']);
      }
    });
  }

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
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Object>('http://localhost:5113/api/Users/me', { headers, withCredentials: true }).subscribe({
      next: res => {
         
        this.user = {
          username: res['username' as keyof Object].toString(),
          id: Number(res['id' as keyof Object]),
          email: res['email' as keyof Object].toString()
        }
        this.username = res['username' as keyof Object].toString();
        this.authService.setUser(this.user)
        this.router.navigate(['/dashboard']);
      }
      , error: err => console.error('Failed to Login', err)
    })


    
  }
}
