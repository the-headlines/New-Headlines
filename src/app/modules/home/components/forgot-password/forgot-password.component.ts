import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    forgotPassForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public auth: AuthService
    ) {
        this.forgotPassForm = this.fb.group({
            email: ['']
        });
    }

    ngOnInit() {
    }

    sendEmail() {
        if (this.forgotPassForm.valid) {

            this.auth.sendForgotPassRequest1(this.forgotPassForm.value).subscribe(dt => {
                this.forgotPassForm.reset();
            });
        }
    }

}
