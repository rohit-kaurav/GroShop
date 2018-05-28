import { UserService } from './../services/user.service';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import 'rxjs/add/operator/map';

export class NewUser {

    constructor() { }

    static hasUniqueUsername(service: UserService) {
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise((resolve, reject) => {
                service.checkUsernameExists(control.value)
                    .subscribe(data => {
                        if(data.message == 'User available') resolve(null);
                        resolve({ hasUniqueUsername: false });
                    })
            })
        }
    }

    static hasUniqueEmail(service: UserService){
        return (control: AbstractControl): Promise<ValidationErrors | null> =>{
            return new Promise((resolve,reject) => {
                service.checkEmailAlreadyExists(control.value)
                    .subscribe(data => {
                        if(data.message == 'Email available') resolve(null);
                        resolve({ hasUniqueEmail: false });
                    })
            })
        }
    }

    static hasValidEmail(control: AbstractControl): ValidationErrors | null{
        let email = control.value;
        return
    }

    static passwordsShouldMatch(control:AbstractControl): ValidationErrors | null{
        let password = control.get('password').value;
        let confirmpassword = control.get('confirmpassword').value;
        if(password == confirmpassword) {
            return null;
        }
        return { passwordsShouldMatch : true };
    }
} 