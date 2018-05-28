import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NewUser } from '../validations/user-validator.validator';
import { transition, trigger, animate, style, state } from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations:[
    trigger('fade',[
      transition('* => void',animate('500ms',style({ opacity:0 })))
    ])
  ]
})
export class SignUpComponent {
  
  signUpForm: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mandatory: boolean = false;
  
  constructor(fb: FormBuilder, private newUserService: UserService) {
    this.signUpForm = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      username: ['', 
                  [Validators.required, Validators.minLength(5)], 
                  NewUser.hasUniqueUsername(this.newUserService)
                ],
      passwordgroup: fb.group({
        password: ['', 
                    [Validators.required, Validators.minLength(5)]
                  ],
        confirmpassword: []
      }, { validator: NewUser.passwordsShouldMatch }),
      email: ['', 
              [Validators.required, Validators.pattern(this.emailPattern)], 
              NewUser.hasUniqueEmail(this.newUserService)
             ]
    })
  }

  get firstname(){
    return this.signUpForm.get('firstname');
  }

  get lastname(){
    return this.signUpForm.get('lastname');
  }

  get username(){
    return this.signUpForm.get('username');
  }

  get email(){
    return this.signUpForm.get('email');
  }

  get age(){
    return this.signUpForm.get('age');
  }

  get password(){
    return this.signUpForm.get('passwordgroup').get('password');
  }

  get confirmpassword(){
    return this.signUpForm.get('passwordgroup').get('confirmpassword');
  }

  get passwordgroup(){
    return this.signUpForm.get('passwordgroup');
  }

  onSubmit() {
    if(this.signUpForm.invalid){
      this.mandatory = true;
      setTimeout(() => {
        this.mandatory = false;
      }, 1500);
    }
    console.log(this.signUpForm);
    // this.newUserService.signUp(this.signupform.value)
    //   .subscribe(data => {
    //     console.log("signup", data);
    //   });
  }
}
