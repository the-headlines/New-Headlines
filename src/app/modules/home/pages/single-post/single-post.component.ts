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
    selectedCommentType = 'Comment';
    filteredComments;
    showReplyInput = false;
    postCategory: string;

    commentEditForm: FormGroup;

    voteTypes = [
        {name: 'Important', pages: ['Influence']},
        {name: 'Interesting', pages: ['Influence']},
        {name: 'Investigate', pages: ['Influence']},
        {name: 'Resign', pages: ['Influence']},
        {name: 'Like', pages: ['StyleAndSweat', 'HumanStories', 'Videos']},
        {name: 'Good', pages: ['StyleAndSweat']},
        {name: 'Top Class', pages: ['StyleAndSweat']},
        {name: 'Magic', pages: ['StyleAndSweat']},
        {name: 'Awesome', pages: ['CameraPictures']},
        {name: 'Haft', pages: ['CameraPictures']},
        {name: 'Cool', pages: ['CameraPictures']},
        {name: 'Funny', pages: ['CameraPictures']},
        {name: 'Inspiring', pages: ['HumanStories']},
        {name: 'Promising', pages: ['JumpStartups']},
        {name: 'LoveTheColor', pages: ['LoveDesigns']},
        {name: 'Grand', pages: ['LoveDesigns']},
        {name: 'Creative', pages: ['LoveDesigns']},
        {name: 'Refreshing', pages: ['Videos']},
        {name: 'Useful', pages: ['Videos']}
    ];

    constructor(
        public auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private home: HomeService,
        private fb: FormBuilder,
        private subject: SubjectService,
        private renderer: Renderer2
    ) {
        this.id = this.route.snapshot.paramMap.get('id');

        this.postForm = this.fb.group({
            text: ['', Validators.required],
            newsId: '',
            type: 'Comment'
        });
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

        // const token = localStorage.getItem('userInf');
        // if (token) {
        //     console.log(token);
        //     this.userData = JWT(token);
        // }

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
            // console.log(dt);
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

            this.singlePost = data;
            this.postCategory = data.category;
            this.voteTypes = this.voteTypes.filter(t => t['pages'].includes(this.postCategory));

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
        });
    }

    onEditorChange(e) {
        if (this.postForm.valid && e.key === 'Enter' && this.postOnEnter) {
            // console.log(this.selectedCommentType);
            // if (this.postForm.value.text.replace(/<(.|\n)*?>/g, '').includes('?')) {
            //
            //     this.addQuestions();
            // } else {
            //     // console.log('here');

            this.addComments();
            // }
        }
    }

    getComments() {
        this.home.getCommentsForPost(this.postId).subscribe((dt: any) => {
            dt.comments.sort((a, b) => {
                return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
            });
            this.comments = dt.comments;
            this.filteredComments = dt.comments.filter(c => c.type === this.selectedCommentType);
        });
    }

    changeCommentType(v) {
        this.questions = v;
        this.selectedCommentType = v;
        this.commentEditForm.patchValue({type: v});
        this.postForm.patchValue({type: v});
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
