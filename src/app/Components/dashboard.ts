import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Console, error } from 'console';
import { AuthService } from '../Services/login.service';
@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: '../Html/dashboard.html',
  //styleUrl: './app.css'

}) export class DashboardComponent {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5113/api/Users/me';
  userName: String = "";
  email: string = "";

  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.loadUser();
    var user = this.authService.currentUser;

    console.log(user?.username.toString())
    if (user != null) {
      this.userName = user.username.toString();
    } 
     
  }
 
 
   

  }

