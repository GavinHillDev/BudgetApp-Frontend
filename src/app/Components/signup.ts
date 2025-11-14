import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: '../Html/signup.html',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  //styleUrl: './app.css'
})
export class SignupComponent {
  form = new FormGroup({
    Username: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl('')
  });
  userExists = false; //Alert For SignUpCheck
  userExistsInput = ''; //Input Signup
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5113/api/Users';

  //getUserById(id: number) {
  //  return this.http.get<{ id: number; username: string }>(`${this.apiUrl}/${id}`);

  //}

 
  validateSignUp() {
    const email = this.form.get('Email')?.value;

    console.log("Called")
    this.http.get<{ exists: boolean }>(`${this.apiUrl}/check/${email}`).subscribe({
      next: res => {
        if (res.exists) {
          console.log("User Exists");
          
        } else {
          console.log("User available");
          this.createUser();
        }
         
      },
      error: err => console.error("Failed to check email:", err)
    });
  }


  createUser() {
    console.log("Create User Called");
    const createdUser = {
      Username: this.form.get('Username')?.value,
      Email: this.form.get('Email')?.value,
      Password: this.form.get('Password')?.value
    };
    console.log(createdUser);
    this.http.post(this.apiUrl,createdUser).subscribe({
      next: res => { console.log("User Created") }
     , error: err => console.error('Failed to create user', err)
    })
    this.form.reset();
  }


}
