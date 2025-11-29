import { Component } from '@angular/core';
import { AppleService } from '../Services/apple.service';
@Component({
  selector: 'home',
  standalone: true,
  template: `
    <h1>Welcome to Budget Application</h1>
    <p>This is the home page.</p>
  `
})
export class HomeComponent {
  //constructor(private appleService: AppleService) { }
  //ngOnInit() {
  //  // This could be called automatically or via a button, etc.
  //  this.appleService.logApples();
  //}

}
