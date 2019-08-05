import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReportComponentComponent} from '../../modules/home/components/report-component/report-component.component';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-story-options',
    templateUrl: './story-options.component.html',
    styleUrls: ['./story-options.component.scss']
})

export class StoryOptionsComponent implements OnInit {
    @ViewChild('toggleButton') toggleButton: ElementRef;
    @ViewChild('share') share: ElementRef;
    @Input() single;
    @Input() singlePostPage = false;

    isShown = false;
    currentPost = {};
    openNum: boolean;
    animal: string;
    name: string;

    constructor(
        private renderer: Renderer2,
        public dialog: MatDialog,
        public auth: AuthService,
        public router: Router
    ) {
        this.renderer.listen('window', 'click', (e: Event) => {
            if (this.toggleButton && e.target !== this.toggleButton.nativeElement) {
                this.isShown = false;
                // console.log('window click');
            }
        });

        this.openNum = false;
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(ReportComponentComponent, {
            width: '250px',
            data: {name: this.name, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    ngOnInit() {
    }

    toggleShow(single) {
        this.isShown = !this.isShown;
        this.currentPost = single;
        // console.log('button click')
    }

    copyLink(link, input) {
        if (this.isOS()) {
            const range = document.createRange();
            range.selectNodeContents(input);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            input.setSelectionRange(0, 999999);

        } else {

            input.select();
            document.execCommand('copy');
        }
    }

    isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

}
