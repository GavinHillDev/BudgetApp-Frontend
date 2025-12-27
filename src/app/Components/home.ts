import { Component } from '@angular/core';

@Component({
  selector: 'home',
  standalone: true,
  template: `
    <h1>Welcome to Your Budget Tracker</h1>
    <h2>Please Login or Sign up to continue</h2>
  `
})
export class HomeComponent {
  //constructor(private appleService: AppleService) { }
  //ngOnInit() {
  //  // This could be called automatically or via a button, etc.
  //  this.appleService.logApples();
  //}

}
