import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../../../services/home.service';
import * as moment from 'moment';
import {SubjectService} from '../../../../services/subject.service';
import {Router} from '@angular/router';

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

    constructor(
        private home: HomeService,
        private subject: SubjectService,
        public router: Router
    ) {
    }

    ngOnInit() {
        this.getPosts();
        this.subject.getSearch().subscribe(s => {
            this.searchTerm = s;
        });
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
        console.log(single.views);
        this.home.updateViewCount(single).subscribe(dt => {
            this.home.getSinglePost(single._id).subscribe((d: any) => {
                single.views = d.views;
                console.log(single.views);
            });
        });
    }

}
