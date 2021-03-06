import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../../../services/home.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {SubjectService} from '../../../../services/subject.service';
import {ToastrService} from 'ngx-toastr';
import {GenerateSaveNonAuthUserIdPipe} from '../../../../shared/pipes/generate-save-non-auth-user-id.pipe';
import {AuthService} from '../../../../services/auth.service';
import * as moment from 'moment';
import ScrollUp from '../../../../shared/helpers/scroll-up';

@Component({
    selector: 'app-public',
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.sass']
})
export class PublicComponent implements OnInit {
    posts: any = [];
    searchTerm = '';
    page = 1;
    filteredPosts: any = {news: []};
    isShown = screen.width > 767;
    selectedFilter = {vote: 'All', type: 'New'};

    constructor(
        private home: HomeService,
        private router: Router,
        private cs: CookieService,
        private http: HttpClient,
        private subject: SubjectService,
        private toastr: ToastrService,
        private cookie: CookieService,
        private nonAuthId: GenerateSaveNonAuthUserIdPipe,
        public auth: AuthService
    ) {
    }

    ngOnInit() {
        this.subject.getSearch().subscribe(s => {
            this.searchTerm = s;
        });

        // Generating & saving non-auth user id in a cookie if not set
        this.nonAuthId.transform();

        this.home.getPublic(this.page).subscribe((dt: any) => {
            dt['news'].sort((a, b) => {
                return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
            });

            this.posts = dt;
            this.filteredPosts.news = dt.news;
        });
    }


    /**
     * Infinite scroll handler
     * @param e
     * @param index
     */
    onIntersection(e, index) {
        if (index === this.filteredPosts.news.length - 1) {
            ++this.page;
            this.home.getPublic(this.page).subscribe((data: any) => {

                if (data.news.length !== 0) {


                    data['news'].sort((a, b) => {
                        return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
                    });

                    Array.prototype.push.apply(this.posts.news, data.news);
                    Array.prototype.push.apply(this.filteredPosts.news, data.news);
                    const uniqueArray = this.filteredPosts.news.filter((thing, index) => {
                        return index === this.filteredPosts.news.findIndex(obj => {
                            return JSON.stringify(obj) === JSON.stringify(thing);
                        });
                    });

                    uniqueArray.sort((a, b) => {
                        return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
                    });


                    this.filteredPosts.news = uniqueArray;
                }
            });
        }

    }

    incrementViews(single) {
        this.home.updateViewCount(single).subscribe(dt => {
            this.home.getSinglePost(single._id).subscribe((d: any) => {
                single.views = d.views;
                this.subject.setPostScore(d.score);
            });
        });
    }

    filterByVotes(vote) {
        this.selectedFilter.vote = vote;
        this.home.getPostsByVoteType('Public', vote, this.selectedFilter.type).subscribe((dt: any) => {
            this.posts = dt;
            this.filteredPosts.news = dt.news;

            ScrollUp.do();
        });
    }

    filterByType(e) {
        this.selectedFilter.type = e.target.value;
        this.home.getPostsByVoteType('Public', this.selectedFilter.vote, this.selectedFilter.type).subscribe((dt: any) => {
            this.posts = dt;
            this.filteredPosts.news = dt.news;
            if (this.responsiveMode) {
                this.isShown = false;
            }
            ScrollUp.do();
        });
    }

    get responsiveMode() {

        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    toggleShow() {
        this.isShown = !this.isShown;
    }

    hideDiv(trigger) {
        trigger.closeMenu();
        this.isShown = false;
    }
}
