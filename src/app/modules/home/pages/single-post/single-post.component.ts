import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HomeService} from '../../../../services/home.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-single-post',
    templateUrl: './single-post.component.html',
    styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
    is_edit: boolean = false;

    constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private home: HomeService) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.getSinglePost(this.id);
    }

    id;
    singlePost: any = [];
    comments: any = [];
    related: any = [];
    addCommentData: any = [];
    start = 0;
    pageCount = 4;
    commentCount = 0;

    isDisabled(): boolean {
        return this.is_edit;
    }

    ngOnInit() {

    }

    ckeditorContent: any;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    nameFormControl = new FormControl('', [
        Validators.required,
    ]);

    commentFormControl = new FormControl('', [
        Validators.required
    ]);

    matcher = new MyErrorStateMatcher();

    addComment = {name: '', email: '', comment: ''};

    getSinglePost(id) {
        this.home.getSinglePost(id).subscribe((data) => {
            console.log(data);
            if (!data) {
                return false;
            }

            if (!data['status'] && data['status'] == 0) {
                alert('Empty data!!');
                return false;
            }

            this.singlePost = data['result']['post'];
            this.comments = data['result']['comment'];
            this.related = data['result']['related'];
            this.commentCount = data['comment_count'];
            this.start = data['result']['comment'].length;

        });
    }

    getSingle(id) {
        this.router.navigate(['/posts', id]);
        this.getSinglePost(id);
    }

    addComments(data) {
        this.home.addComments(data).subscribe((returData) => {
            console.log(returData);
            if (!returData) {
                return false;
            }

            if (!returData['status'] && returData['status'] == 0) {
                alert('Empty data!!');
                return false;
            }

            this.addCommentData.push(returData['result']);
            console.log(this.addCommentData);
        });
    }

    checkUser() {
        let userLoggined = localStorage.getItem('userInf');
        if (typeof userLoggined == 'undefined') {
            return false;
        }

        let userInf = JSON.parse(userLoggined);

        if (userInf == null) {
            return false;
        }

        if (userInf['userInf'] == '') {
            return false;
        }
        return true;
    }

    loadMyChildComponent() {
        this.home.comments({'start': this.start, 'end': this.start + this.pageCount}).subscribe((data) => {

            if (this.start > this.commentCount) {
                return;
            }
            //this.comments.push(data['result']);
            data['result'].map((single) => {
                this.comments.push(single);
            });

            this.start += data['result'].length;
        });
    }
}
