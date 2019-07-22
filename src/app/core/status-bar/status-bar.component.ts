import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from '../../services/home.service';
import * as moment from '../../modules/home/pages/home/home.component';
import {AuthService} from '../../services/auth.service';
import {SubjectService} from '../../services/subject.service';
import * as JwtDecode from 'jwt-decode';

@Component({
    selector: 'app-status-bar',
    templateUrl: './status-bar.component.html',
    styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
    // @ViewChild('toggleButton') toggleButton: ElementRef;
    // @ViewChild('check') check: ElementRef;
    @Input() single;
    @Output() voted = new EventEmitter();

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
        {name: 'Like', pages: ['StyleAndSweat', 'HumanStories', 'Videos', 'JumpStartups']},
        {name: 'Good', pages: ['StyleAndSweat']},
        {name: 'TopClass', pages: ['StyleAndSweat']},
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
        this.home.getVotesData(this.postCategory).subscribe((data: any) => {

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

        this.userData = JwtDecode(localStorage.getItem('token'));

        if (this.single) {
            this.postCategory = this.single.category;
            this.voteTypes = this.voteTypes.filter(t => t['pages'].includes(this.postCategory));
        }

        // this.home.getPostVotes(single._id).subscribe((d: any) => {
        //     console.log(this.userData);
        //     console.log(d.votes);
        //     const data = d.votes.filter(v => v.creator && v.creator._id === this.userData.userId);
        //     console.log(data);
        //     this.votes = data;
        // });


    }

    vote(type, single) {
        if (type === 'Like') {
            this.upwote = !this.upwote;
        }
        if (!single.userVoted) {
            ++single.totalVotes;
        }


        if (type !== single['votedCategory']) {


            this.home.doVoting(single._id, type).subscribe(dt => {
                // this.voted.emit();
                this.home.getSinglePost(single._id).subscribe(d => {
                    this.single = d;
                    console.log(this.single, d);
                });

                // this.home.getPostVotes(single._id).subscribe((d: any) => {
                //     console.log(this.userData);
                //     console.log(d.votes);
                //     const data = d.votes.filter(v => v.creator && v.creator._id === this.userData.userId);
                //     console.log(data);
                //     this.votes = data;
                // });

                // this.home.getVotesData(this.postCategory).subscribe((data: any) => {
                //     this.isShown = !this.isShown;
                //     this.votes = data;
                // });
            });
        }
    }

    getSingle(single) {
        this.home.updateViewCount(single).subscribe(dt => {

            this.router.navigate(['/post', single._id]);
        });
    }
}
