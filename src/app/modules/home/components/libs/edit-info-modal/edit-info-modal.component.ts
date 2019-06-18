import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-edit-info-modal',
    templateUrl: './edit-info-modal.component.html',
    styleUrls: ['./edit-info-modal.component.scss']
})

export class EditInfoModalComponent implements OnInit {
    files = [];
    name;
    term;

    constructor(
        public dialogRef: MatDialogRef<EditInfoModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.term = data.name;
        console.log(data);
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
        this.files.push(args);
    }
}
