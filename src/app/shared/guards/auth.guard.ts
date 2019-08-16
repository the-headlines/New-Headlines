import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    redirectUrl: string;

    constructor(
        public auth: AuthService,
        public router: Router,
        public toastr: ToastrService
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
            this.toastr.error('', 'Please log in first!');
            // this.router.navigate(['/']);
            return false;
        }
    }
}
