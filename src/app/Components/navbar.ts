//Navbar shows different navations
//LogIn Signup
//Then when logged in, crud, settings,home
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../Services/login.service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: '../Html/navbar.html',
  //styleUrl: './app.css'

}) export class NavbarComponent {
  userLoggedIn = false;
  noUser = true;
  user: User | null = null;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.navBarRun()
  }

  navBarRun() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      //  this.user = this.authService.currentUser;
      if (this.user != null) {
        this.noUser = false;
        this.userLoggedIn = true;
      }
    })
  }

}

