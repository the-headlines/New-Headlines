import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {ModalDialog} from '../libs/modal.dialog';
import {MatDialog, MatDialogRef} from '@angular/material';
import * as JWT from 'jwt-decode';
import {CommonService} from '../../../../services/common.service';
import {SubjectService} from '../../../../services/subject.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    @ViewChild('closest') closest: ElementRef;
    @Output() openRegister = new EventEmitter();
    options: FormGroup;
    loginForm: FormGroup;
    submitted = false;

    emailFormControl = new FormControl('', [
        // Validators.required,
        // Validators.email,
    ]);

    passFormControl = new FormControl('', [
        // Validators.required
    ]);

    matcher = new MyErrorStateMatcher();

    userLoginInf = {password: '', email: ''};

    constructor(
        private auth: AuthService,
        public router: Router,
        private matDialog: MatDialog,
        private common: CommonService,
        private subject: SubjectService,
        private loginDialogRef: MatDialogRef<LoginComponent>,
        private fb: FormBuilder,
        private cookie: CookieService
    ) {
        this.loginForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required]
        });


        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'always',
        });
    }

    ngOnInit() {
    }

    showLogin() {
        this.loginDialogRef.close();
        this.subject.setDialogState({state: 'closed', dialog: 'login'});
        // ModalDialog.openDialog(2, this.matDialog);
    }

    get() {
        this.auth.getPosts().subscribe((data) => {
            if (!data) {
                return false;
            }
        });
    }


    checkLogin(data) {
        this.submitted = true;
        this.auth.checkLogin(this.loginForm.value).subscribe((r: any) => {

            this.cookie.delete('uniqueUserId', '/');
            localStorage.setItem('full_name', r.fullname);
            localStorage.setItem('userInf', JSON.stringify(r['token']));
            localStorage.setItem('token', r['token']);
            this.subject.setUserData({...JWT(r.token), ...{fullName: r.fullname}});
            //this.router.navigate(['']);
            let el: HTMLElement = this.closest.nativeElement as HTMLElement;
            el.click();
        });
    }

    logOut() {
        // remove user from local storage to log user out
        localStorage.removeItem('userInf');
    }
}
