import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    forgotPassForm: FormGroup;
    confirmNewPassForm: FormGroup;
    emailToken;
    formSubmitted = false;

    constructor(
        private fb: FormBuilder,
        public auth: AuthService,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) {
        this.forgotPassForm = this.fb.group({
            email: ['', Validators.required]
        });

        this.confirmNewPassForm = this.fb.group({
            token: [''],
            newPassword: ['', Validators.compose([Validators.required])],
            newPassConfirm: ['', Validators.required],
        }, {
            validator: this.comparePasswords
        });
    }

    comparePasswords(control: AbstractControl) {
        const password: string = control.get('newPassword').value; // get password from our password form control
        const confirmPassword: string = control.get('newPassConfirm').value; // get password from our confirmPassword form control

        // compare is the password math
        if (password && confirmPassword && password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('newPassConfirm').setErrors({passwordsMismatch: true});
        } else {
            control.get('newPassConfirm').setErrors({});
        }
    }

    ngOnInit() {
        const params = this.route.snapshot.paramMap['params'];

        if (params.hasOwnProperty('token')) {

            this.emailToken = params.token;
            this.confirmNewPassForm.patchValue({token: params.token});
        }
    }


    sendEmail() {
        this.formSubmitted = true;
        if (this.forgotPassForm.valid) {

            this.auth.sendForgotPassRequest(this.forgotPassForm.value).subscribe(dt => {
                this.forgotPassForm.reset();
                this.formSubmitted = false;
                this.toastr.success(dt['message']); // 'We will shortly send you an email describing your next steps. Thank you.'
            });
        }
    }

    sendNewPass() {
        console.log(this.confirmNewPassForm.value);
        // if (this.confirmNewPassForm.valid) {
            this.auth.sendNewPass(this.confirmNewPassForm.value).subscribe(dt => {
                this.confirmNewPassForm.reset();
            });
        // }

    }


    get emailControl() {
        return this.forgotPassForm.get('email');
    }

    get passControl() {
        return this.confirmNewPassForm.get('newPassword');
    }

    get passConfirmControl() {
        return this.confirmNewPassForm.get('newPassConfirm');
    }

}
