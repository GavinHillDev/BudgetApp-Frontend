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
  isUpdateOpen = false;
  selectedTransaction: Transaction | null = null;
  selectedTransactionId: number | null = null;

  form = new FormGroup({
    TransactionNameUpdate: new FormControl(''),
    TransactionPriceUpdate: new FormControl(''),
    TransactionCategoryUpdate: new FormControl(''),
    TransactionDateUpdate: new FormControl('')
  });



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

     
  }
  DeleteTransaction(id: number) {
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    this.http.post(`http://localhost:5113/api/Transactions/deletetransaction`, id, { headers }).subscribe({
      next: () => {
        this.loadTransaction();
      }
      , error: err => console.error('Failed to create user', err)
    })
  }
  Calculate() {
    for (let i: number = 0; i < this.transactions.length; i++) {
      this.amountSpent += this.transactions[i].transactionPrice
    }
  }
  UpdateTransaction(transaction: Transaction) {

    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    this.http.get('http://localhost:5113/api/TransactionCategories', { headers }).subscribe({
      next: res => { console.log(res), this.categories = res as any[] }
      , error: err => console.error(err)
    })

    this.selectedTransaction = transaction;
    this.selectedTransactionId = transaction.id;
    this.isUpdateOpen = true;
    this.form.patchValue({
      TransactionNameUpdate: transaction.transactionName,
      TransactionPriceUpdate: transaction.transactionPrice.toString(),
      TransactionCategoryUpdate: transaction.categoryName,
      TransactionDateUpdate: transaction.transactionDate
    })
 
   };
  closeUpdate() {
    this.isUpdateOpen = false;
  }
  SubmitUpdate() {
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    const updatedTransaction = {
      TransactionName: this.form.get('TransactionNameUpdate')?.value,
      TransactionPrice: this.form.get('TransactionPriceUpdate')?.value,
      TransactionCategory: this.form.get('TransactionCategoryUpdate')?.value,
      TransactionDate: this.form.get('TransactionDateUpdate')?.value
    };

    this.http.put(`http://localhost:5113/api/Transactions/${this.selectedTransactionId}`, updatedTransaction, { headers }).subscribe({
      next: () => {
        this.loadTransaction();
        this.closeUpdate();
      }
      , error: err => console.error('Failed to create user', err)
    })
  }

  }
 
export interface Transaction {
  id: number;
  transactionName: string;
  transactionPrice: number;
  transactionDate: string;
  categoryName: string;
}
