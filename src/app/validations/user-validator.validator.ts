import { UserService } from './../services/user.service';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import 'rxjs/add/operator/map';

export class NewUser {

    constructor() { }

    static hasUniqueUsername(service: UserService) {
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            console.log("Value of control ", control.value);
            return new Promise((resolve, reject) => {
                service.checkUsernameExists(control.value)
                    .subscribe(data => {
                        console.log("validations ",data);
                        resolve(null);
                    })
            })
        }
    }

    static hasUniqueEmail(service: UserService){
        return (control: AbstractControl): Promise<ValidationErrors | null> =>{
            return new Promise((resolve,reject) => {
                service.checkEmailAlreadyExists(control.value)
                    .subscribe(data => {
                        console.log("inside email validations ", data);
                        resolve(null);
                    })
            })
        }
    }

    static passwordsShouldMatch(control:AbstractControl): ValidationErrors | null{
        let password = control.get('password').value;
        let confirmpassword = control.get('confirmpassword').value;
        if(password == confirmpassword) {
            console.log("passwords match");
            return { passwordsShouldMatch : false };
        }
        console.log("passwords dont match");
        return { passwordsShouldMatch : true };
    }
} 