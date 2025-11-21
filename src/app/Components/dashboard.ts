import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { error } from 'console';
@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: '../Html/dashboard.html',
  //styleUrl: './app.css'

})
export class DashboardComponent {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5113/api/Users/me';

  checkForUser() {
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);
    const headers = new HttpHeaders( {
      'Authorization': `Bearer ${token}`
    });

    this.http.get(this.apiUrl, {headers}).subscribe({
      next: res => { console.log(res) }
      , error: err => console.error('Failed to Login', err)
    })
  }
  
}
