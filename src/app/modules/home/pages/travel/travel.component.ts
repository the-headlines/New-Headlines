import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../../../services/home.service';
import * as moment from 'moment';
import {SubjectService} from '../../../../services/subject.service';
import {Router} from '@angular/router';
import {GenerateSaveNonAuthUserIdPipe} from '../../../../shared/pipes/generate-save-non-auth-user-id.pipe';
import ScrollUp from '../../../../shared/helpers/scroll-up';

@Component({
    selector: 'app-travel',
    templateUrl: './travel.component.html',
    styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {
    posts: any = [];
    searchTerm = '';
    page = 1;
    filteredPosts: any = {news: []};
    isShown = screen.width > 767;
    selectedFilter = {vote: 'All', type: 'New'};

    constructor(
        private home: HomeService,
        private subject: SubjectService,
        public router: Router,
        private nonAuthId: GenerateSaveNonAuthUserIdPipe
    ) {
    }

    ngOnInit() {
        this.getPosts();
        this.subject.getSearch().subscribe(s => {
            this.searchTerm = s;
        });

        // Generating & saving non-auth user id in a cookie if not set
        this.nonAuthId.transform();
    }

    getPosts() {
        this.home.getTravel(this.page).subscribe((dt: any) => {

            dt['news'].sort((a, b) => {
                return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
            });

            this.posts = dt;
            this.filteredPosts.news = dt.news;

        });
    }

    getLinkSource(url) {
        let hostname;

        if (url.indexOf('//') > -1) {
            hostname = url.split('/')[2];
        } else {
            hostname = url.split('/')[0];
        }

        // find & remove port number
        hostname = hostname.split(':')[0];

        // find & remove "?"
        hostname = hostname.split('?')[0];

        return hostname;
    }

    getDateFormatted(createdDate, onlyDate = true) {


        if (!onlyDate) {

            const a = moment(); // date now
            const b = moment(createdDate); // post created date

            const minutes = a.diff(b, 'minutes');
            const hours = a.diff(b, 'hours');
            const days = a.diff(b, 'days');
            const weeks = a.diff(b, 'weeks');
            const months = a.diff(b, 'months');
            const years = a.diff(b, 'years');

            if (hours === 0) {
                return `${minutes} minutes ago`;
            } else {
                if (days === 0) {
                    return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
                } else {
                    if (weeks === 0) {
                        return `${days} ${days > 1 ? 'days' : 'day'} ago`;
                    } else if (months === 0) {
                        return `${weeks} ${weeks > 1 ? 'weeks' : 'week'} ago`;
                    } else if (years === 0) {
                        return `${months} ${months > 1 ? 'months' : 'month'} ago`;
                    }
                }
            }
        } else {
            return moment(createdDate).format('MMMM Do YYYY, h:mm:ss a');
        }


    }

    getSinglePost(id) {
        this.router.navigate(['/post', id]);
    }

    /**
     * Infinite scroll handler
     * @param e
     * @param index
     */
    onIntersection(e, index) {
        if (index === this.filteredPosts.news.length - 1) {
            ++this.page;
            this.home.getTravel(this.page).subscribe((data: any) => {

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
                this.subject.setPostScore(d.score);
                single.views = d.views;
            });
        });
    }

    filterByVotes(vote) {
        this.selectedFilter.vote = vote;
        this.home.getPostsByVoteType('HumanStories', vote, this.selectedFilter.type).subscribe((dt: any) => {
            this.posts = dt;
            this.filteredPosts.news = dt.news;

            ScrollUp.do();
        });
    }

    filterByType(e) {
        this.selectedFilter.type = e.target.value;
        this.home.getPostsByVoteType('HumanStories', this.selectedFilter.vote, this.selectedFilter.type).subscribe((dt: any) => {
            this.posts = dt;
            this.filteredPosts.news = dt.news;
            ScrollUp.do();
        });
    }

    toggleShow() {
        this.isShown = !this.isShown;
    }

    hideDiv(trigger) {
        trigger.closeMenu();
        this.isShown = false;
    }

    get responsiveMode() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}
