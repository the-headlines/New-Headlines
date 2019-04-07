import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {ModalDialog} from '../libs/modal.dialog';
import {MatDialog} from '@angular/material';

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

  constructor(private auth: AuthService, private router: Router, private matDialog: MatDialog) {
  }



  ngOnInit() {
    //this.get();

  }

  showLogin() {
    ModalDialog.openDialog(2, this.matDialog);
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

  passFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  userLoginInf = {email: '', pass: ''};


  checkLogin(data) {
    data.loginned = true;
    this.auth.checkLogin(data).subscribe((r: any) => {

      console.log(r);
      if (r['status'] == 0) {
        console.log('aa');
        alert('Login/Password invalid');
        return false;
      }

      localStorage.setItem('userInf', JSON.stringify(r['result']));
      //this.router.navigate(['']);
      let el: HTMLElement = this.closest.nativeElement as HTMLElement;
      el.click();
    });
  }
}
