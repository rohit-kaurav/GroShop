import { UserService } from './../services/user.service';
import { JwtHelper } from 'angular2-jwt';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()
export class UserLoggedInGuard implements CanActivate{
    
    constructor(private user: UserService, private router: Router){}

    canActivate(){
        if(!this.user.isLoggedIn()) return true;
        
        this.router.navigate(['/home']);
        return false;
    }
}