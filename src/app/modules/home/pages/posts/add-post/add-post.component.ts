import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../../../../post';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsService} from '../../../../../services/posts.service';
import {ToastrService} from 'ngx-toastr';
import {StripHtmlTagsPipe} from '../../../../../shared/pipes/strip-html-tags.pipe';
import {MAIN_SECTIONS} from '../../../../../shared/constants/main';

export interface Category {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.scss']
})

export class AddPostComponent implements OnInit, OnDestroy {


    @HostListener('window:beforeunload', ['$event'])
    onWindowClose(event: any): void {
        // Do something

        event.preventDefault();
        event.returnValue = false;

    }

    categories = MAIN_SECTIONS;

    newPost: Observable<any>;

    readonly POST_URL = 'http://3.8.219.107:3000';

    public type: string = 'component';

    public disabled: boolean = false;

    ckeditorContent: any;

    postForm: FormGroup;

    files = [];
    videoLink = false;
    selectedCategory;
    editCase = false;
    postSubmitted = false;

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private posts: PostsService,
        private toastr: ToastrService,
        private stripTags: StripHtmlTagsPipe
    ) {


    }

    ngOnInit() {
        this.postForm = this.fb.group({
            // description: [null],
            link: [null],
            category: [null, Validators.required],
            video: [false]
        });

        this.postForm.patchValue({category: 0});


        const id = this.route.snapshot.params.id;
        if (id) {
            this.editCase = true;
            this.posts.getPost(id).subscribe(dt => {
                this.postForm.patchValue(dt);

            });
        }


    }


    upload_files() {

        if (this.postForm.valid) {
            const formData = new FormData();
            // formData.append('description', this.postForm.value['description']);
            formData.append('link', this.postForm.value['link']);
            formData.append('category', this.postForm.value['category']);
            // formData.append('video', false);
            // console.log(this.files);
            this.files.map(file => {
                formData.append('story_imgs', file.name);
                formData.append('story_img_files', file, file.name);
                // console.log(file.name);
            });
            // formData.forEach(entries => console.log(entries));

            if (!this.editCase) {
                this.auth.uploadPost(this.postForm.value).subscribe((r: any) => {
                    this.toastr.success('The post has been added successfully');
                    this.router.navigate(['/']);
                    // localStorage.setItem('this.postForm', JSON.stringify(r));
                });
            } else {
                this.posts.update(this.route.snapshot.params.id, this.postForm.value).subscribe((r: any) => {
                    this.toastr.success('The post has been updated successfully');
                    this.router.navigate(['/']);
                    // localStorage.setItem('this.postForm', JSON.stringify(r));
                });
            }


        }
    }


    public onUploadInit(args: any): void {
        // console.log('onUploadInit:', args);
    }

    public onUploadError(args: any): void {
        // console.log('onUploadError:', args);
    }

    public onUploadSuccess(args: any): void {
        // console.log('onUploadSuccess:', args);
        this.files.push(args);
    }

    createPost() {
        const data: Post = {
            name: 'title',
            email: 'eee@gmail.com',
            password: '',
            userId: null,
            id: null,
            body: 'sfd',
            title: ''
        };
        this.posts.postData(data).subscribe(dt => {

        });
        // this.newPost = this.http.post(this.POST_URL + '/api/user/signup', data);
    }

    cancelPosting() {
        this.postSubmitted = true;
        this.router.navigate([this.editCase ? '/managePost' : '/']);
    }

    setVideo(e) {
        this.postForm.patchValue({video: e.checked});
    }

    getValue(food) {
        return food.viewValue.replace(/ /g, '');
    }

    getToolbarConfig() {
        return {
            height: 100,
            maxLength: 1,
            wordcount: {
                maxCharCount: 4,
                charLimit: 2,
                showCharCount: true,
            },
            allowOutsideOutDir: true,
            toolbarGroups: [
                // { name: 'document',    groups: [ 'doctools', 'mode', 'document' ] },
                // { name: 'editing',     groups: [  'selection', 'spellchecker' ] },
                {name: 'basicstyles', groups: ['basicstyles']},
                {name: 'paragraph', groups: ['blocks']},
                // { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                // { name: 'forms' }
            ],
            removeButtons: 'CreateDiv,Subscript,Superscript,Strike,Underline'
        };
    }

    getCurrentSection(category) {
        this.selectedCategory = category;
        this.videoLink = category === 'Videos';
        this.postForm.patchValue({video: this.videoLink});
    }

    checkLength() {
        const desc = this.stripTags.transform(this.postForm.value.description).trim();
        if (desc.length > 2) {
            return false;
        }
    }

    ngOnDestroy(): void {
    }
}
