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
  form = new FormGroup({
    TransactionName: new FormControl(''),
    TransactionPrice: new FormControl(''),
    TransactionCategory: new FormControl(''),
    TransactionDate: new FormControl('')
  });

  loggeduser: User | null = null;

  userExists = false; //Alert For SignUpCheck
  userExistsInput = ''; //Input Signup
  private router = inject(Router);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5113/api/Transactions';
  NgOnInit() {
    this.authService.user$.subscribe(loggeduser => {
      this.loggeduser = loggeduser;
      //  this.user = this.authService.currentUser;
    });
  }

  CreateTransaction() {
    const newTransaction = {
      TransactionName: this.form.get('TransactionName')?.value,
      TransactionPrice: this.form.get('TransactionPrice')?.value,
      TransactionCategory: this.form.get('TransactionCategory')?.value,
      TransactionDate: this.form.get('TransactionDate')?.value
    };
    this.http.post(`${this.apiUrl}/createtransaction`, newTransaction).subscribe({
      next: res => { console.log("Transaction Created") }
      , error: err => console.error('Failed to create user', err)
    })
  }


 
  //Create Transaction  - Amount, Category, Date, Name
  //Dropdown category - Option to creat new category
  //Show last 5 transactions - seperatee page to view all
  //Option to delete transactions on view page,
  // Count transaction category spending and show on main page

}
