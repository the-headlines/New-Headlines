import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from '../../services/home.service';
import * as moment from '../../modules/home/pages/home/home.component';

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
    selectedVote;
    votes = [];

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

    get() {
        this.home.getVotesData().subscribe((data: any) => {

            this.votes = data;

            /*  this.postData = data;*/
            // this.count = data['count'];
            // console.log(this.count, 'count');

            // this.paginate(data);
            // this.posts = data;
            // this.filteredPosts = data;
            //

            // this.filteredPosts.paginator = this.paginator;
            //
            // console.log(this.posts);
            // return this.posts;
        });
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
