import {Component, OnInit} from '@angular/core';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.scss']
})

export class AddPostComponent implements OnInit {

    public type: string = 'component';

    public disabled: boolean = false;

    public config: DropzoneConfigInterface = {
        clickable: true,
        maxFiles: 1,
        autoReset: null,
        errorReset: null,
        cancelReset: null
    };

    constructor() {
    }

    ngOnInit() {

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

}
