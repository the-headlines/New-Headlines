import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReportComponentComponent} from '../../modules/home/components/report-component/report-component.component';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {PostsService} from '../../services/posts.service';
import {SubjectService} from '../../services/subject.service';

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
        public router: Router,
        private post: PostsService,
        private subject: SubjectService
    ) {
        this.renderer.listen('window', 'click', (e: Event) => {
            if (this.toggleButton && e.target !== this.toggleButton.nativeElement) {
                this.isShown = false;
                // console.log('window click');
            }
        });

        this.openNum = false;

    }

    openDialog(id): void {
        const dialogRef = this.dialog.open(ReportComponentComponent, {
            width: '250px',
            data: {id: id}
        });

        dialogRef.afterClosed().subscribe(result => {
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

        if (navigator.userAgent.match(/ipad|ipod|iphone/i) || navigator.platform.includes('Mac')) {
            var editable = input.contentEditable;
            var readOnly = input.readOnly;

            input.contentEditable = true;
            input.readOnly = false;

            var range = document.createRange();
            range.selectNodeContents(input);

            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            input.setSelectionRange(0, 999999);
            input.contentEditable = editable;
            input.readOnly = readOnly;
            console.log(selection, range);

            document.execCommand('copy');
        } else {

            input.select();
            console.log(input.value);
            document.execCommand('copy');
        }
    }

    isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    incrementShares(e) {
        ++this.single.shares;
        this.subject.setPostScore(++this.single.score);
        this.post.updateSharesCount(this.single._id, e.charAt(0).toUpperCase() + e.substring(1)).subscribe(dt => {

        });
    }

}
