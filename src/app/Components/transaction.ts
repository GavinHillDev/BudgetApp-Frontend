import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterOutlet, Router } from '@angular/router';
//import { LoginResponse } from './Components/loginresponse';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { error } from 'console';
import { AuthService, User } from '../Services/login.service';

@Component({

  selector: 'transaction',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: '../Html/transaction.html',
  //styleUrl: './app.css'

})

export class TransactionComponent {
  constructor(private authService: AuthService) { }


}
