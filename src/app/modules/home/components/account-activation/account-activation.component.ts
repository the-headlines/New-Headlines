import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../../../services/common.service';
import {SPINNER_DIAMETER} from '../../../../shared/constants/main';

@Component({
    selector: 'app-account-activation',
    templateUrl: './account-activation.component.html',
    styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit {

    userData;
    tokenExpired = false;
    spinnerDiameter = SPINNER_DIAMETER;
    tokenSend = false;

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private jwtHelper: JwtHelperService,
        private toastr: ToastrService,
        private cdr: ChangeDetectorRef,
        public auth: AuthService,
        public common: CommonService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const token = params.token || '';

            const parts = token.split('.');
            // if (parts.length !== 3) {
            //     this.toastr.error('The token is invalid');
            //     this.cdr.detectChanges();
            // } else if (token) {
            // this.tokenExpired = this.jwtHelper.isTokenExpired(token);
            // this.userData = jwtDecode(token);
            // console.log(this.userData);

            const self = this;

            setTimeout(() => {
                self.auth.activateAccount(token).subscribe(async (d) => {
                    self.common.tokenSend = true;
                    await this.router.navigate(['/']);
                    this.toastr.success('Your account is verified!');
                });
            }, 5000);
        });
    }

}
