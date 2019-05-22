import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ModalDialog } from '../libs/modal.dialog';
import { MatDialog } from '@angular/material';
  
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
  constructor(private auth: AuthService, private router: Router, private matDialog: MatDialog) {}

  ngOnInit() {
    //this.get();
  }

  showLogin() {
    ModalDialog.openDialog(1, this.matDialog);
  }

  get() {
    this.auth.getPosts().subscribe((data) => {
      if (!data) {
        return false;
      }
    });
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  confPassFormControl = new FormControl('', [
    Validators.required,
  ]);

  passFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  userRegisInf = { name: '', email: '', pass: '', confPass: '' };

  checkRegister(data) {
    this.auth.createUser(data.name, data.email, data.pass).subscribe(
      response => {
        this.matDialog.closeAll();
        //Show the user name on the top and hide the login/register button.
      },
      error => {
        console.log("Registration error: " + error.error["message"]);
        //Show alert
      }
    );
  }
}



