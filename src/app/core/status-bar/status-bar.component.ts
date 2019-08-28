import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from '../../services/home.service';
import * as moment from '../../modules/home/pages/home/home.component';
import {AuthService} from '../../services/auth.service';
import {SubjectService} from '../../services/subject.service';
import * as JwtDecode from 'jwt-decode';
import {VOTE_TYPES} from '../../shared/constants/main';
import {CountPostScorePipe} from '../../shared/pipes/count-post-score.pipe';
import {ToastrService} from 'ngx-toastr';

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
    voteTypes = VOTE_TYPES;
    postScore = 0;

    constructor(
        private renderer: Renderer2,
        public router: Router,
        private home: HomeService,
        public auth: AuthService,
        private subject: SubjectService,
        private countScore: CountPostScorePipe,
        private toastr: ToastrService
    ) {
        this.openNum = false;
    }

    ngOnInit() {
        this.routerUrl = this.router.url;

        const token = localStorage.getItem('token');
        if (token) {
            this.userData = JwtDecode(token);
        }

        this.subject.getPostScore().subscribe(score => {
            this.postScore = score;
        });

        if (this.single) {
            this.postCategory = this.single.category;
            this.postScore = this.single.score;
            this.voteTypes = this.voteTypes.filter(t => {
                return t['pages'].includes(this.postCategory);
            });
        }
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


    vote(type, single) {
        if (type === 'Like') {
            this.upwote = !this.upwote;
        }

        if (type === 'TheHuman') {
            type = 'LoveTheHuman';
        }


        if (this.auth.loggedIn()) {


            if (type !== single['votedCategory']) {

                this.isShown = true;
                this.home.doVoting(single._id, type).subscribe(dt => {
                    // this.voted.emit();
                    this.home.getVoteDetails(single._id).subscribe((d: any) => {
                        if (!single.userVoted) {
                            ++single.totalVotes;
                        }

                        if (d.news && d.news.length > 0) {
                            this.single = d.news[0];
                            this.postScore = this.single.score;
                        }
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
        } else {
            this.toastr.error('', 'Please log in first!');
        }


    }

    getSingle(single, commentsType) {
        this.home.updateViewCount(single).subscribe((dt: any) => {
            this.postScore = dt.score;
            this.router.navigate(['/post', single._id], {queryParams: {type: commentsType}});
        });
    }

    showHeart(name) {
        return name === 'TheHuman' || name === 'TheColor';
    }

    loveCase(name) {
        return name === 'Love';
    }

    hiddenQuestions() {
        return /road|deals|travel/i.test(this.routerUrl) || /StyleAndSweat|HumanStories|LoveDesigns/i.test(this.postCategory);
    }


    hiddenComments() {
        return /commerce/i.test(this.routerUrl) || /JumpStartups/i.test(this.postCategory);
    }

    hiddenCritics() {
        return !(/road/i.test(this.routerUrl)) && !(/StyleAndSweat/i.test(this.postCategory));
    }

    hiddenFeedback() {
        return !(/JumpStartups/i.test(this.postCategory));
    }

}
