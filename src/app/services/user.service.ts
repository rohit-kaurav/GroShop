import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  public login(user) {
    return this.http.post('user/login', user)
      .catch(err => Observable.throw(err.json()))
      .map(user => {
        return JSON.parse(user._body);
      })
  }

  public signUp(newuser) {
    let user = new User();
    user.firstname = newuser.firstname;
    user.lastname = newuser.lastname;
    user.age = newuser.age;
    user.email = newuser.email;
    user.username = newuser.username;
    user.password = newuser.password;
    return this.http.post('user/signup', user)
      .map(data => {
        console.log(data);
        return data.json();
      })
      .catch(err => Observable.throw(err));
  }

  public checkUsernameExists(username) {
    return this.http.post('user/username_exists', { 'username': username })
      .map(data => {
        console.log("checkUser", data);
        return data;
      });
  }

  public checkEmailAlreadyExists(email) {
    return this.http.post('user/email_exists', { 'email': email })
      .map(data => {
        console.log("checkemail", data);
        return data;
      })
  }
}
