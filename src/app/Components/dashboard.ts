import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Console, error } from 'console';
@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: '../Html/dashboard.html',
  //styleUrl: './app.css'

}) export class DashboardComponent {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5113/api/Users/me';
  userName: string = "";
  user = {
    Username: ""
  };
  ngOnInit() {
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log("Calling:", this.apiUrl);
    console.log("Header:", headers.get("Authorization"));
    this.http.get<Object>(this.apiUrl, { headers, withCredentials: true }).subscribe({
      next: res => {
        console.log(res['username' as keyof Object])
        this.userName = res['username' as keyof Object].toString();
      }
      , error: err => console.error('Failed to Login', err)
    })
  }



  //checkForUser() {
  //  console.log("CHECK RUN");
  //  const token = localStorage.getItem("token");
  //  console.log("TOKEN:", token);
  //  const headers = new HttpHeaders({
  //    'Authorization': `Bearer ${token}`
  //    });
    
  //  console.log("Calling:", this.apiUrl);
  //  console.log("Header:", headers.get("Authorization"));
  //  this.http.get(this.apiUrl, { headers, withCredentials: true }).subscribe({
  //    next: res => { console.log(res) }
  //    , error: err => console.error('Failed to Login', err)
  //  })

  }

 
  
}

//Research JwtTokens & http / https to figure out why get is not working // Log token in backend 
