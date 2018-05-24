import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NewUser } from '../validations/user-validator.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {

  constructor(fb: FormBuilder, private newUserService: UserService) {
    this.signupform = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      username: ['', Validators.required, NewUser.hasUniqueUsername(this.newUserService)],
      passwordgroup: fb.group({
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required]
      }, NewUser.passwordsShouldMatch),
      email: ['', Validators.required, NewUser.hasUniqueEmail(this.newUserService)]
    })
  }

  signupform: FormGroup;

  onSubmit() {
    console.log(this.signupform);
    // this.newUserService.signUp(this.signupform.value)
    //   .subscribe(data => {
    //     console.log("signup", data);
    //   });
  }
}
