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
  transactions: any[] = [];
  categories: any[] = [];
  amountSpent: Number = 0;
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    if (this.user != null) {
      this.userName = this.user.username;
      this.loadTransaction();
    }
  
  }
  loadTransaction() {
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    this.http.get('http://localhost:5113/api/Transactions', { headers }).subscribe({
      next: res => { console.log(res), this.transactions = res as any[], this.Calculate() }
      , error: err => console.error(err)
    })
    this.http.get('http://localhost:5113/api/TransactionCategories', { headers }).subscribe({
      next: res => { console.log(res), this.categories = res as any[] }
      , error: err => console.error(err)
    })
     
    console.log("Test")
    console.log(this.transactions.length)
    console.log(this.transactions)
  }
  DeleteTransaction(id: number) {
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    this.http.post(`http://localhost:5113/api/Transactions/deletetransaction`, id, { headers }).subscribe({
      next: () => {
        this.loadTransaction();
        console.log("Deleted")
      }
      , error: err => console.error('Failed to create user', err)
    })
  }
  Calculate() {
    for (let i: number = 0; i < this.transactions.length; i++) {
      console.log(this.transactions[i])
      this.amountSpent += this.transactions[i].transactionPrice
    }

  }
  }

