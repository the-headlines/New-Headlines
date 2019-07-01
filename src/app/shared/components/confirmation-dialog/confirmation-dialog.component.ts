import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

    constructor(
        private matDialog: MatDialog
    ) {
    }

    ngOnInit() {
    }

    cancel() {
        this.matDialog.closeAll();
    }

}
