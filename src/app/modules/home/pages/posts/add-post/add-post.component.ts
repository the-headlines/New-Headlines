import {Component, OnInit} from '@angular/core';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../../../../post';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.scss']
})

export class AddPostComponent implements OnInit {

    newPost: Observable<any>;
    readonly POST_URL = 'http://3.8.219.107:3000';

    public type: string = 'component';

    public disabled: boolean = false;

    public config: DropzoneConfigInterface = {
        clickable: true,
        maxFiles: 1,
        autoReset: null,
        errorReset: null,
        cancelReset: null
    };
    ckeditorContent: any;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {

    }

    upload_files(data) {

    }

    public onUploadInit(args: any): void {
        console.log('onUploadInit:', args);
    }

    public onUploadError(args: any): void {
        console.log('onUploadError:', args);
    }

    public onUploadSuccess(args: any): void {
        console.log('onUploadSuccess:', args);
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
