import {NgModule} from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTableModule, ButtonModule, SharedModule} from 'primeng/primeng';
import {PostsRoutingModule} from './posts-routing.module';
import {AddPostComponent} from './add-post/add-post.component';
import {SubscribeComponent} from './subscribe/subscribe.component';
import {PostsHomeComponent} from './posts-home/posts-home.component';
import {CKEditorModule} from 'ng2-ckeditor';
import {MatFormFieldModule, MatSelectModule, MatTabsModule} from '@angular/material';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: '{not_defined}',
    acceptedFiles: 'image/*',
    autoProcessQueue: false,
    createImageThumbnails: true
};

@NgModule({
    declarations: [AddPostComponent, SubscribeComponent, PostsHomeComponent],
    imports: [
        CommonModule,
        PostsRoutingModule,
        CKEditorModule,
        MatTabsModule,
        DropzoneModule,
        FormsModule,
        DataTableModule,
        ButtonModule,
        SharedModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    providers: [{
        provide: DROPZONE_CONFIG,
        useValue: DEFAULT_DROPZONE_CONFIG
    }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PostsModule {

}
