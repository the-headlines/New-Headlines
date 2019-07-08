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
import * as moment from 'moment';

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
    questions = false;

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
            text: ['', Validators.required],
            newsId: '',
            type: 'Comment'
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
    like = true;
    postOnEnter = true;
    commentEditing = false;
    selectedComment = null;

    commentEditForm: FormGroup;

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

                if (this.auth.loggedIn()) {
                    this.getComments();
                    this.getPostVotes(this.postId);
                }
                this.postForm.patchValue({newsId: dt.id});
                this.getSinglePost(this.postId);
            })
        );

        this.subscriptions.push(this.subject.getUserData().subscribe((dt: any) => {
            console.log(dt);
            this.userData = dt;
        }));

        this.userData.fullName = localStorage.getItem('full_name');
        // this.postForm.patchValue({user: this.userData.fullName});

        this.commentEditForm = this.fb.group({
            id: [''],
            text: [''],
            type: ['Comment']
        });


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

        const data = this.postForm.value;
        this.home.addComments(data).subscribe((d) => {
            if (!d) {
                return false;
            }

            if (!d['status'] && d['status'] == 0) {
                alert('Empty data!!');
                return false;
            }

            if (d['result']) {

                this.addCommentData.push(d['result']);
            }

            this.getComments();
            this.postForm.patchValue({'text': ''});
        });
    }

    addQuestions() {
        this.postForm.patchValue({type: 'Question'});
        this.addComments();
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
        this.home.doVoting(id, type).subscribe(dt => {
            // console.log(dt);
        });
    }

    onEditorChange(e) {
        const textVal = this.postForm.value.text.replace(/<(.|\n)*?>/g, '');
        if (this.postForm.valid && e.key === 'Enter' && this.postOnEnter) {
            if (textVal.includes('?')) {
                this.addQuestions();
            } else {

                this.addComments();
            }
        }
    }

    getComments() {
        this.home.getCommentsForPost(this.postId).subscribe((dt: any) => {
            dt.comments.sort((a, b) => {
                return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
            });
            this.comments = dt.comments;
        });
    }

    changeCommentType(v) {
        this.questions = v;
        this.commentEditForm.patchValue({type: v ? 'Question' : 'Comment'});
    }

    editComment(c) {
        this.commentEditing = true;
        this.selectedComment = c;
        this.commentEditForm.patchValue({'text': c.text, id: c._id});
    }

    updateComment() {
        this.commentEditing = false;
        this.selectedComment = null;
        this.home.updateComment(this.commentEditForm.value).subscribe(dt => {
            this.getComments();
        });
    }

    removeComment(id) {
        this.home.deleteComment(id).subscribe(dt => {
            this.getComments();
        });
    }

    getQuestionsLen(type) {
        return this.comments.filter(c => c.type === type).length;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }


}
