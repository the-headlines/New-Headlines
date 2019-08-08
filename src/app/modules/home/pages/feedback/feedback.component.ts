import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AsideService} from '../../../../services/aside.service';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})


export class FeedbackComponent implements OnInit {

    lastet: any = [];
    feedbackForm: FormGroup;

    constructor(
        private auth: AuthService,
        private router: Router,
        private matDialog: MatDialog,
        private aside: AsideService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<FeedbackComponent>,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.getLasted();
        this.feedbackForm = this.fb.group({
            name: [''],
            feedback: [''],
            email: ['']
        });
        // console.log(this.lastet);
    }

    get() {
        this.auth.getPosts().subscribe((data) => {
            if (!data) {
                return false;
            }
        });
    }

    getSingle(id) {
        this.router.navigate(['/posts', id]);
    }

    getLasted() {
        this.aside.getLasted().subscribe((data) => {
            // console.log(data);
            if (!data) {
                return false;
            }

            if (!data['status'] && data['status'] == 0) {
                alert('No data');
                return false;
            }

            this.lastet = data['result'];
        });
    }


    getContact() {

        this.auth.getContact(this.feedbackForm.value).subscribe((data: any) => {
            this.dialogRef.close();
            this.toastr.success(data.message);

        });
    }
}
