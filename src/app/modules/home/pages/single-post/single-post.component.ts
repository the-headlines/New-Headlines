import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
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
import {Category} from '../posts/add-post/add-post.component';
import {VOTE_TYPES} from '../../../../shared/constants/main';
import {CapitalizePipe} from '../../../../shared/pipes/capitalize.pipe';
import * as JwtDecode from 'jwt-decode';

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
    @ViewChild('button') toggleButton: ElementRef;
    @ViewChild('share') share: ElementRef;

    isEdit = false;
    postForm: FormGroup;
    userData: any = {};
    subscriptions: Subscription[] = [];
    questions = false;
    show: boolean = false;
    selectedToggleBtn;

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
    selectedCommentType;
    filteredComments;
    showReplyInput = false;
    postCategory: string;

    commentEditForm: FormGroup;

    voteTypes = VOTE_TYPES;

    constructor(
        public auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private home: HomeService,
        private fb: FormBuilder,
        private subject: SubjectService,
        private renderer: Renderer2,
        private capitalize: CapitalizePipe
    ) {
        this.id = this.route.snapshot.paramMap.get('id');


        // this.postForm.controls.comment.disable();
        //
        this.renderer.listen('window', 'click', (e: Event) => {
            // console.log(e.target);
            // console.log(this.selectedToggleBtn._elementRef.nativeElement);
            // console.log(this.selectedToggleBtn._elementRef.nativeElement !== e.target);


            if (this.selectedToggleBtn) {

                if (this.selectedToggleBtn._elementRef.nativeElement !== e.target) {
                    this.show = false;
                    this.selectedToggleBtn = null;
                } else {
                    this.show = true;
                }
            }

            if (!this.selectedToggleBtn && this.toggleButton && this.share && e.target !== this.toggleButton.nativeElement && e.target !== this.share.nativeElement) {
                this.show = false;
                // console.log('window click');
            }


        });
    }

    checkForPage() {

    }

    isDisabled(): boolean {
        return this.isEdit;
    }

    ngOnInit() {
        console.log('OK');
        window.scrollTo(50, 500);
        document.body.scrollTop = 200;
        // const token = localStorage.getItem('userInf');
        // if (token) {
        //     console.log(token);
        //     this.userData = JWT(token);
        // }

        this.postForm = this.fb.group({
            text: ['', Validators.required],
            newsId: '',
            type: 'Comment'
        });

        this.commentEditForm = this.fb.group({
            id: [''],
            text: [''],
            type: ['Comment']
        });


        this.subscriptions.push(
            this.route.params.subscribe(dt => {
                this.postId = dt.id;
                this.getLikesCount();

                if (this.auth.loggedIn()) {
                    this.getComments();
                    this.getPostVotes(this.postId);
                }
                this.postForm.patchValue({newsId: dt.id});
                this.getSinglePost(this.postId);
            })
        );
        this.subscriptions.push(this.subject.getUserData().subscribe((dt: any) => {
            this.userData = dt;
        }));

        // Getting user data from local storage
        this.userData = JwtDecode(localStorage.getItem('token'));
        this.userData.fullName = localStorage.getItem('full_name');
        // this.postForm.patchValue({user: this.userData.fullName});

        // Getting selected comment type passed from previous page
        this.selectedCommentType = this.capitalize.transform(this.route.snapshot.queryParams.type) || 'Comment';
        this.changeCommentType(this.selectedCommentType);

    }

    getLikesCount() {
        this.home.getLikesCount(this.postId).subscribe(dt => {

        });
    }

    toggleDiv(event, button) {
        this.show = !this.show;
        this.selectedComment = null;
        this.selectedToggleBtn = button;
        // console.log(button._elementRef.nativeElement)
        // console.log('button click');
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
        this.home.getSinglePost(id).subscribe((data: any) => {
            if (data.news && data.news.length > 0) {

                data = data.news[0];
                this.singlePost = data;
                this.postCategory = data.category;
                this.voteTypes = this.voteTypes.filter(t => t['pages'].includes(this.postCategory));
                this.singlePost.score = data.score;

                // this.comments = data['result']['comment'];
                // this.related = data['result']['related'];
                // this.commentCount = data['comment_count'];
                // this.start = data['result']['comment'].length;

                this.subject.setPostCategory(this.postCategory);
            }
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

        if (data.type === 'Critics') {
            data.type = 'Question';
        }

        // this.selectedCommentType = 'Comment';
        // this.postForm.patchValue({type: 'Comment'});
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
        this.selectedCommentType = 'Question';
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
            this.getPostVotes(id);
            this.getSinglePost(id);
        });
    }

    onEditorChange(e) {
        if (this.postForm.valid && e.key === 'Enter' && this.postOnEnter) {
            this.addComments();
        }
    }

    getComments() {
        this.home.getCommentsForPost(this.postId).subscribe((dt: any) => {
            dt.comments.sort((a, b) => {
                return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
            });
            this.comments = dt.comments;
            this.filteredComments = dt.comments.filter(c => c.type === this.selectedCommentType);
            this.singlePost.score = this.selectedCommentType === 'Question' ? this.singlePost.score + 2 : ++this.singlePost.score;
        });
    }

    changeCommentType(v) {
        if (v === 'Feedback') {
            v = 'Comment';
        }

        this.questions = v;
        this.selectedCommentType = v;

        if (this.postForm && this.commentEditForm) {
            this.commentEditForm.patchValue({type: v});
            this.postForm.patchValue({type: v});
        }
        this.filteredComments = this.comments.filter(c => c.type === v);
    }

    editComment(c) {
        this.commentEditing = true;
        this.selectedComment = c;
        this.showReplyInput = false;
        this.commentEditForm.patchValue({'text': c.text, id: c._id});
    }

    updateComment() {
        this.commentEditing = false;
        this.selectedComment = null;
        this.commentEditForm.value.type = this.commentEditForm.value.text.replace(/<(.|\n)*?>/g, '').includes('?') ? 'Question' : 'Comment';
        this.home.updateComment(this.commentEditForm.value).subscribe(dt => {
            this.getComments();
        });
    }

    removeComment(id) {
        this.home.deleteComment(id).subscribe(dt => {
            this.getComments();
        });
    }

    getCommentsLen(type) {
        return this.comments.filter(c => c.type === type).length;
    }

    likeComment(id, liked) {
        this.home.likeComment(id, liked).subscribe(dt => {
            this.getComments();
        });
    }

    isCommentAuthor(author) {
        console.log(author);
    }

    toggleReplyInput(c) {
        this.showReplyInput = true;
        this.selectedComment = c;
        this.commentEditing = false;
    }

    replyComment() {

    }

    reportComment(c) {
        this.home.reportComment(c).subscribe(dt => {

        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }


}
