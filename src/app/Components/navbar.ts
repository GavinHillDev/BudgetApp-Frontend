//Navbar shows different navations
//LogIn Signup
//Then when logged in, crud, settings,home
import { Component } from '@angular/core';
import { AuthService, User } from '../Services/login.service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: '../Html/navbar.html',
  //styleUrl: './app.css'

}) export class NavbarComponent {

  user: User | null = null;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.loadUser() != null) {
      this.user = this.authService.currentUser;

      console.log(this.user?.username)
    }
    //Remove Login Signup and change links once user is signed in
  }
 
}

