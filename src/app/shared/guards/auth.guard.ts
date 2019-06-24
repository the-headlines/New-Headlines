import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    redirectUrl: string;

    constructor(
        public auth: AuthService,
        public router: Router,
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {

        if (this.auth.loggedIn()) {
            return true;
        } else {

            // this is the url used for redirecting after login, if user wanted to access that first
            this.redirectUrl = state.url;
            this.router.navigate(['/']);
            return false;
        }
    }
}
