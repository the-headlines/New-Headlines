import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    acceptedCookies = !!localStorage.getItem('acceptedCookie');

    constructor(
        public auth: AuthService,
        public router: Router
    ) {
    }

    ngOnInit() {
    }

    showCookieMsg() {
        return !this.auth.loggedIn() && !this.acceptedCookies;
    }

    accept() {
        this.acceptedCookies = true;
        localStorage.setItem('acceptedCookie', this.acceptedCookies.toString());
    }

    learnMore() {
        this.router.navigate(['policy']);
    }

}
