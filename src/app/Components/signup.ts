import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { HttpClient, HttpParams, HttpParameterCodec, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,HttpClientModule],
  templateUrl: '../Html/signup.html',
  //styleUrl: './app.css'
})
export class SignupComponent {
  username = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5113/api/Users';

  getUserById(id: number) {
    return this.http.get<{ id: number; username: string }>(`${this.apiUrl}/${id}`);

  }

 
  validateSignUp() {
    console.log("Called")
    this.http.get<{ exists: boolean }>(`${this.apiUrl}/check/${this.email.value}`).subscribe({
      next: res => {
        if (res.exists) {
          console.log("User Exists");
          
        } else {
          console.log("User available");
        }
      },
      error: err => console.error("Failed to check username:", err)
    });
  }

  ngOnInit() {
    this.getUserById(1).subscribe({
      next: (data) =>  data.username,
      error: (err) => console.error('Failed to load user:', err)
    });
  }

}
//Show Notice and clear email field when username is taken, same with username
