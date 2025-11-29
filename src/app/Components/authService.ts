import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from '../../../node_modules/rxjs/dist/types/index';

export interface User {
  id: number;
  username: string;
  email: string;
}


@Injectable()
export class AuthService{
  printTest() {
    console.log("Test");
  }
  //private user = new BehaviorSubject<User | null>(null);
  //user$ = this.user.asObservable();

  //setUser(user: User) {
  //  this.user.next(user);
  //}
  //getUser() {
  //  return this.user.value;
  //}
}

