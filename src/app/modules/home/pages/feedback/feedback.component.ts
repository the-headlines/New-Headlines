import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})


export class FeedbackComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private matDialog: MatDialog) {
  }

  ngOnInit() {
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

  messFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  userContactInf = {name: '', email: '', mess: ''};

  getContact(data) {
    data.loginned = true;
    this.auth.getContact(data).subscribe((mess: any) => {

      console.log(mess);
      if (mess['status'] == 0) {
        console.log('aa');
        alert('Email invalid');
        return false;
      }
      if (mess['status'] == 1) {
        alert('thank you your message has been sent');
      }
    });
  }

}
