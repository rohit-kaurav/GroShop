import { JwtHelper } from 'angular2-jwt';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";


@Injectable()
export class AdminAuthGuard implements CanActivate{

    constructor(private router:Router){}

    canActivate(route, state:RouterStateSnapshot){
        let jwt = new JwtHelper();
        let token = localStorage.getItem('token');
        if(token){
            let decoded = jwt.decodeToken(token);
            if(decoded.isAdmin){
                return true;
            }
        }
        this.router.navigate(['/']);
        return false;
    }
}