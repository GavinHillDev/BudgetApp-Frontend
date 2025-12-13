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

  form = new FormGroup({
    TransactionName: new FormControl(''),
    TransactionPrice: new FormControl(''),
    TransactionCategory: new FormControl(''),
    TransactionDate: new FormControl('')
  });

  user: User | null = null;

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5113/api/Transactions';
  userName: String = "";
  email: string = "";
  transactions: any[] = [];
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (this.user != null) {
        this.userName = this.user.username;
        this.loadTransaction();
      }
    });

  }
    CreateTransaction(){
      const token = localStorage.getItem("token");

      const headers = new HttpHeaders({
        "Authorization": `Bearer ${token}`
      });



      console.log(this.user)
      const newTransaction = {
        TransactionName: this.form.get('TransactionName')?.value,
        TransactionPrice: this.form.get('TransactionPrice')?.value,
        TransactionCategory: this.form.get('TransactionCategory')?.value,
        TransactionDate: this.form.get('TransactionDate')?.value
      };
      console.log(newTransaction) 
      console.log("Running - Trnsaction")
      this.http.post(`${this.apiUrl}/createtransaction`, newTransaction, { headers }).subscribe({
        next: res => { console.log(newTransaction) }
        , error: err => console.error('Failed to create user', err)
      })
      this.form.reset();
      this.loadTransaction();
  }
  loadTransaction() {
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    this.http.get('http://localhost:5113/api/Transactions', { headers }).subscribe({
      next: res => { console.log(res), this.transactions = res as any[] }
      , error: err => console.error(err)
    })
    console.log("Test")
    console.log(this.transactions.length)
    console.log(this.transactions)
  }
  }

 
  //Create Transaction  - Amount, Category, Date, Name
  //Dropdown category - Option to creat new category
  //Show last 5 transactions - seperatee page to view all
  //Option to delete transactions on view page,
  // Count transaction category spending and show on main page
 

