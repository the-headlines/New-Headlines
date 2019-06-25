import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute, NavigationStart, ParamMap, Router} from '@angular/router';
import {HomeService} from '../../../../services/home.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import * as JWT from 'jwt-decode';
import {SubjectService} from '../../../../services/subject.service';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

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
export class SinglePostComponent implements OnInit, OnDestroy {
    isEdit = false;
    postForm: FormGroup;
    userData: any = {};

    subscriptions: Subscription[] = [];

    constructor(
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private home: HomeService,
        private fb: FormBuilder,
        private subject: SubjectService
    ) {
        this.id = this.route.snapshot.paramMap.get('id');

        this.postForm = this.fb.group({
            text: '',
            newsId: ''
        });
        // this.postForm.controls.comment.disable();


    }

    id;
    singlePost: any = [];
    comments: any = [];
    related: any = [];
    addCommentData: any = [];
    start = 0;
    pageCount = 4;
    commentCount = 0;
    showCk = false;
    postId;
    votes = [];
    upwote = true;

    isDisabled(): boolean {
        return this.isEdit;
    }

    ngOnInit() {

        // const token = localStorage.getItem('userInf');
        // if (token) {
        //     console.log(token);
        //     this.userData = JWT(token);
        // }
        this.subscriptions.push(
            this.route.params.subscribe(dt => {
                this.postId = dt.id;
                this.postForm.patchValue({newsId: dt.id});
                this.getSinglePost(this.postId);
                this.getPostVotes(this.postId);
            })
        );

        this.subscriptions.push(this.subject.getUserData().subscribe((dt: any) => {
            console.log(dt);
            this.userData = dt;
        }));

        this.userData.fullName = localStorage.getItem('full_name');
        // this.postForm.patchValue({user: this.userData.fullName});

        // console.log(this.userData);
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

    toggleReadOnly(x) {

    }

    getSinglePost(id) {
        this.home.getSinglePost(id).subscribe((data) => {

            this.singlePost = data;
            // this.comments = data['result']['comment'];
            // this.related = data['result']['related'];
            // this.commentCount = data['comment_count'];
            // this.start = data['result']['comment'].length;

        });
    }

    getPostVotes(id) {
        this.home.getPostVotes(id).subscribe((dt: any) => {
            this.votes = dt['votes'];
        });
    }

    getSingle(id) {
        this.router.navigate(['/posts', id]);
        this.getSinglePost(id);
    }

    addComments() {

        console.log(this.postForm.value);
        const data = this.postForm.value;
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

    vote(type, id) {
        this.upwote = !this.upwote;
        this.home.doVoting(id, {voteCategory: type}).subscribe(dt => {
            // console.log(dt);
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }


}
