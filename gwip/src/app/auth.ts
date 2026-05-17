import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class Auth {
 //  router = inject(Router);
    canActivate() {        
        //decode the jwt token in localStorage
        if (localStorage.getItem('loggedInUser') === null) {
            return false;
        }
        const loggedInUser:any = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            if (+loggedInUser['role'] === 1 ) {  //only admin can access the dashboard and users page
                return true;
            } else {
              // this.router.navigate(['home']);
                return false;
            }
        }
        return false;
    }
}