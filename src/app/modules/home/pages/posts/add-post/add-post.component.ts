import {Component, OnInit} from '@angular/core';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../../../../post';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../../../services/auth.service';
import {Router} from '@angular/router';

export interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.scss']
})

export class AddPostComponent implements OnInit {

    foods: Food[] = [
        {value: 'hooked-news-0', viewValue: 'Hooked News'},
        {value: 'road-to-fame-1', viewValue: 'Road to fame'},
        {value: 'came-pictures-2', viewValue: 'Camera Pictures'},
        {value: 'jump-startup-3', viewValue: 'Jump Startup'},
        {value: 'travel-monkey-4', viewValue: 'Travel Monkey'},
        {value: 'fantastic-deals-5', viewValue: 'Fantastic Deals'},
        {value: 'videos-6', viewValue: 'Videos'}
    ];

    newPost: Observable<any>;

    readonly POST_URL = 'http://3.8.219.107:3000';

    public type: string = 'component';

    public disabled: boolean = false;

    ckeditorContent: any;

    postForm: FormGroup;

    files = [];

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.postForm = this.fb.group({
            description: [null]
        });
    }

    upload_files() {
        console.log(this.postForm.value);
        let formData = new FormData();
        formData.append('description', this.postForm.value['description']);
        console.log(this.files);
        this.files.map(file => {
            formData.append('story_imgs', file.name);
            formData.append('story_img_files', file, file.name);
            console.log(file.name);
        });
        formData.forEach(entries => console.log(entries));

        this.auth.uploadPost(formData).subscribe((r: any) => {
            console.log('ff', r);
            if (r['status'] == 0) {
                console.log('aa');
                alert('Login/Password invalid');
                return false;
            }
            this.router.navigate['/posts/home-posts'];
            localStorage.setItem('this.postForm', JSON.stringify(r));
        });
    }


    public onUploadInit(args: any): void {
        console.log('onUploadInit:', args);
    }

    public onUploadError(args: any): void {
        console.log('onUploadError:', args);
    }

    public onUploadSuccess(args: any): void {
        console.log('onUploadSuccess:', args);
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
        this.newPost = this.http.post(this.POST_URL + '/api/user/signup', data);
    }
}
