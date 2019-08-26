import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../../../../core/story-options/story-options.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostsService} from '../../../../services/posts.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-report-component',
    templateUrl: './report-component.component.html',
    styleUrls: ['./report-component.component.scss']
})
export class ReportComponentComponent implements OnInit {
    reportForm: FormGroup;
    newsId;

    constructor(
        private fb: FormBuilder,
        private posts: PostsService,
        private toastr: ToastrService,
        public dialogRef: MatDialogRef<ReportComponentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.newsId = data['id'];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.reportForm = this.fb.group({
            newsId: this.newsId,
            type: ['', Validators.required]
        });
    }

    reportPost() {
        this.posts.report(this.reportForm.value).subscribe((d: any) => {
            this.toastr.success(d.message);
            this.dialogRef.close();
        });
    }

}
