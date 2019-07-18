import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from '../../services/home.service';
import * as moment from '../../modules/home/pages/home/home.component';
import {AuthService} from '../../services/auth.service';
import {SubjectService} from '../../services/subject.service';

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
    userData;
    postCategory;
    voteTypes = [
        {name: 'Important', pages: ['Influence']},
        {name: 'Interesting', pages: ['Influence']},
        {name: 'Investigate', pages: ['Influence']},
        {name: 'Resign', pages: ['Influence']},
        {name: 'Like', pages: ['StyleAndSweat', 'HumanStories', 'Videos']},
        {name: 'Good', pages: ['StyleAndSweat']},
        {name: 'Top Class', pages: ['StyleAndSweat']},
        {name: 'Magic', pages: ['StyleAndSweat']},
        {name: 'Awesome', pages: ['CameraPictures']},
        {name: 'Haft', pages: ['CameraPictures']},
        {name: 'Cool', pages: ['CameraPictures']},
        {name: 'Funny', pages: ['CameraPictures']},
        {name: 'Inspiring', pages: ['HumanStories']},
        {name: 'Promising', pages: ['JumpStartups']},
        {name: 'LoveTheColor', pages: ['LoveDesigns']},
        {name: 'Grand', pages: ['LoveDesigns']},
        {name: 'Creative', pages: ['LoveDesigns']},
        {name: 'Refreshing', pages: ['Videos']},
        {name: 'Useful', pages: ['Videos']}
    ];


    constructor(
        private renderer: Renderer2,
        public router: Router,
        private home: HomeService,
        public auth: AuthService,
        private subject: SubjectService
    ) {
        this.openNum = false;
    }

    onClick(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        console.log(target);
        this.isShown = !this.isShown;
        // console.log(this);
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

        if (this.single) {
            this.postCategory = this.single.category;
            this.voteTypes = this.voteTypes.filter(t => t['pages'].includes(this.postCategory));
        }


    }

    vote(type, id) {
        if (type === 'Like') {
            this.upwote = !this.upwote;
        }
        this.home.doVoting(id, type).subscribe(dt => {
            // console.log(dt);
        });
    }

    getSingle(single) {
        this.home.updateViewCount(single).subscribe(dt => {

            this.router.navigate(['/post', single._id]);
        });
    }
}
