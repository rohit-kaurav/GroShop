import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/observable';
import { Component, OnInit } from '@angular/core';

import { User } from './../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private route: ActivatedRoute) {
    if (localStorage.getItem('token')) {

      let token = localStorage.getItem('token');
      let jwt = new JwtHelper();
      let decoded = jwt.decodeToken(token);

      console.log("Expiration data and isExpired", jwt.getTokenExpirationDate(token), jwt.isTokenExpired(token));
      if (!jwt.isTokenExpired(token)) {
        this.currentUser = new User();
        this.currentUser.firstname = decoded.firstname;
        this.currentUser.lastname = decoded.lastname;
        this.currentUser.isAdmin = decoded.isAdmin;
      } else {
        this.logOut();
      }      
    } else {
      this.router.navigate(['/login']);
    }
  }

  currentUser;

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    location.reload();
    this.router.navigate(['/login']);
  }
}
