import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authUser: UserService, private router: Router) { }

  private invalidLoginFlag : boolean = false;

  loginform = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  get username() {
    return this.loginform.get('username');
  }
  get password() {
    return this.loginform.get('password');
  }

  onSubmit() {
    this.authUser.login(this.loginform.value)
      .subscribe(data => {
        console.log(data);
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.id);
          location.reload();
          this.router.navigate(['/']);
        }
      },
        err => {
          console.log(err);
          this.invalidLoginFlag = true;
          this.loginform.reset();
        }
      );
  }

}
