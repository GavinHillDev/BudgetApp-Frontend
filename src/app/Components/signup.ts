import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: '../Html/signup.html',
  //styleUrl: './app.css'
})
export class SignupComponent {
  username = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');


}
