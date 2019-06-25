import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {ModalDialog} from '../libs/modal.dialog';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {SubjectService} from '../../../../services/subject.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss', '../login/login.component.scss']
})

export class RegisterComponent implements OnInit {
    @ViewChild('loginButt') loginButt: ElementRef;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    nameFormControl = new FormControl('', [
        Validators.required,
    ]);

    userFormControl = new FormControl('', [
        Validators.required,
    ]);

    passFormControl = new FormControl('', [
        Validators.required
    ]);

    matcher = new MyErrorStateMatcher();

    userRegisInf = {name: '', email: '', username: '', password: ''};

    constructor(
        private auth: AuthService,
        private router: Router,
        private matDialog: MatDialog,
        private toastr: ToastrService,
        private subject: SubjectService,
        private registerDialogRef: MatDialogRef<RegisterComponent>
    ) {
    }

    ngOnInit() {
        // this.get();
    }

    showLogin() {
        this.registerDialogRef.close();
        this.subject.setDialogState({state: 'closed', dialog: 'register'});
        // ModalDialog.openDialog(1, this.matDialog);
    }

    get() {
        this.auth.getPosts().subscribe((data) => {
            if (!data) {
                return false;
            }
        });
    }


    checkRegister(data) {
        console.log('register', data);
        this.auth.register(data).subscribe((r: any) => {

            this.toastr.success('Registered successfully');
            this.matDialog.closeAll();
            // this.router.navigate(['']);
        });
    }

    signOut() {
        localStorage.removeItem('userInf');
    }
}
