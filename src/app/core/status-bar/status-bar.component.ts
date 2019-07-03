import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from '../../services/home.service';

@Component({
    selector: 'app-status-bar',
    templateUrl: './status-bar.component.html',
    styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
    // @ViewChild('toggleButton') toggleButton: ElementRef;
    // @ViewChild('check') check: ElementRef;
    @Input() single;

    isShown: boolean = false;
    // currentPost = {};
    openNum: boolean;
    routerUrl: string;
    upwote = false;

    constructor(
        private renderer: Renderer2,
        public router: Router,
        private home: HomeService
    ) {
        this.openNum = false;
    }

    onClick(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        console.log(target);
        this.isShown = !this.isShown;
        console.log(this);
    }

    ngOnInit() {
        this.routerUrl = this.router.url;
    }

    vote(type, id) {
        if (type === 'Like') {

            this.upwote = !this.upwote;
        }
        this.home.doVoting(id, {voteCategory: type}).subscribe(dt => {
            // console.log(dt);
        });
    }

    getSingle(id) {
        this.router.navigate(['/post', id]);
    }
}
