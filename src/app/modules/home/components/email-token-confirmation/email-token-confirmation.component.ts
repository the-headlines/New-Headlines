import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-email-token-confirmation',
    templateUrl: './email-token-confirmation.component.html',
    styleUrls: ['./email-token-confirmation.component.sass']
})
export class EmailTokenConfirmationComponent implements OnInit {
    userData;
    tokenExpired = false;

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private jwtHelper: JwtHelperService,
        private toastr: ToastrService,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const token = params.token || '';

            const parts = token.split('.');
            if (parts.length !== 3) {
                this.toastr.error('The token is invalid');
                this.cdr.detectChanges();
            } else if (token) {
                this.tokenExpired = this.jwtHelper.isTokenExpired(token);
                this.userData = jwtDecode(token);

            }

        });
    }

}
