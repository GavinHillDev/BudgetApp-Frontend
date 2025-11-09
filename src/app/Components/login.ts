import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'login',
  standalone : true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: '../Html/login.html',
  //styleUrl: './app.css'
  
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');



}
