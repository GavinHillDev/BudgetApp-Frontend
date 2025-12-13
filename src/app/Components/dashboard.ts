import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Console, error } from 'console';
import { AuthService, User } from '../Services/login.service';
@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: '../Html/dashboard.html',
  //styleUrl: './app.css'

}) export class DashboardComponent {
  user: User | null = null;

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5113/api/Users/me';
  userName: String = "";
  email: string = "";

  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    if (this.user != null) {
      this.userName = this.user.username;
    }
  
  }
 
 
   

  }

