import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    forgotPassForm: FormGroup;
    confirmNewPassForm: FormGroup;
    emailToken;

    constructor(
        private fb: FormBuilder,
        public auth: AuthService,
        private route: ActivatedRoute
    ) {
        this.forgotPassForm = this.fb.group({
            email: ['']
        });

        this.confirmNewPassForm = this.fb.group({
            email: [''],
            newPass: [''],
            newPassConfirm: ['']
        });
    }

    ngOnInit() {
        const params = this.route.snapshot.paramMap['params'];

        if (params.hasOwnProperty('token')) {

            this.emailToken = params.token;
        }
        console.log(this.emailToken);
    }

    sendEmail() {
        if (this.forgotPassForm.valid) {

            this.auth.sendForgotPassRequest1(this.forgotPassForm.value).subscribe(dt => {
                this.forgotPassForm.reset();
            });
        }
    }

    sendNewPass() {
        this.auth.sendNewPass(this.confirmNewPassForm.value).subscribe(dt => {
            this.confirmNewPassForm.reset();
        });
    }

}
