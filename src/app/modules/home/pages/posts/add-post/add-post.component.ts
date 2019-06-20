import {Component, OnInit} from '@angular/core';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../../../../post';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../services/auth.service';
import {Router} from '@angular/router';
import {PostsService} from '../../../../../services/posts.service';
import {ToastrService} from 'ngx-toastr';

export interface Categorie {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.scss']
})

export class AddPostComponent implements OnInit {

    categories: Categorie[] = [
        {value: 'HookedNews', viewValue: 'Hooked News'},
        {value: 'RoadToFame', viewValue: 'Road To Fame'},
        {value: 'CameraPictures', viewValue: 'Camera Pictures'},
        {value: 'JumpStartups', viewValue: 'Jump Startups'},
        {value: 'TravelMonkey', viewValue: 'Travel Monkey'},
        {value: 'FantasticDeals', viewValue: 'Fantastic Deals'},
        {value: 'Videos', viewValue: 'Videos'}
    ];

    newPost: Observable<any>;

    readonly POST_URL = 'http://3.8.219.107:3000';

    public type: string = 'component';

    public disabled: boolean = false;

    ckeditorContent: any;

    postForm: FormGroup;

    files = [];
    videoLink = false;
    selectedCategory;

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private posts: PostsService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.postForm = this.fb.group({
            description: [null],
            link: [null],
            category: [null, Validators.required],
            video: [false]
        });

        this.postForm.patchValue({category: 0});
    }

    upload_files() {
        console.log(this.postForm.value);


        if (this.postForm.valid) {
            const formData = new FormData();
            formData.append('description', this.postForm.value['description']);
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

            this.auth.uploadPost(this.postForm.value).subscribe((r: any) => {
                this.toastr.success('The post has been added successfully');
                this.router.navigate(['/']);
                // localStorage.setItem('this.postForm', JSON.stringify(r));
            });
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

    setVideo(e) {
        this.postForm.patchValue({video: e.checked});
    }

    getValue(food) {
        return food.viewValue.replace(/ /g, '');
    }

    getToolbarConfig() {
        return {
            toolbarGroups: [
                // { name: 'document',    groups: [ 'doctools', 'mode', 'document' ] },
                // { name: 'editing',     groups: [  'selection', 'spellchecker' ] },
                {name: 'basicstyles', groups: ['basicstyles']},
                {name: 'paragraph', groups: ['blocks']},
                // { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                // { name: 'forms' }
            ],
            removeButtons: 'CreateDiv,Subscript,Superscript,Strike'
        };
    }

    getCurrentSection(category) {
        console.log(category);
        this.selectedCategory = category;
        this.videoLink = category === 'Videos';
        this.postForm.patchValue({video: this.videoLink});
    }
}
