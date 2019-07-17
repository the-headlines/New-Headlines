import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../../../services/home.service';
import * as Base from '../../../../configs/config.js';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {SubjectService} from '../../../../services/subject.service';

@Component({
    selector: 'app-commerce',
    templateUrl: './commerce.component.html',
    styleUrls: ['./commerce.component.scss']
})
export class CommerceComponent implements OnInit {
    posts: any = [];
    base = Base.imgPath;
    userLoggined: any = [];
    pageCount = 3;
    start = 0;
    /*  postData: any = [];*/
    count = 0;
    pages = [];
    searchTerm = '';
    page = 1;
    filteredPosts: any = {news: []};

    constructor(
        private home: HomeService,
        private router: Router,
        private subject: SubjectService
    ) {
    }


    ngOnInit() {

        if (this.checkUser()) {
            this.userLoggined = JSON.parse(localStorage.getItem('userInf'));
        }

        this.subject.getSearch().subscribe(s => {
            this.searchTerm = s;
        });

        this.get();
    }

    get() {
        this.home.getCommerce(this.page).subscribe((data: any) => {

            data['news'].sort((a, b) => {
                return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
            });

            this.posts = data;
            this.filteredPosts.news = data.news;
            /*  this.postData = data;*/
            this.count = data['count'];
            // this.paginate(data);
        });
    }

    paginate(data) {

        this.posts = data['result'];

        let cnt = Math.ceil(this.count / this.pageCount);

        for (let i = 1; i <= cnt; i++) {
            this.pages.push(i);
        }
    }

    nextPage(el) {
        this.posts = [];
        let ended = (this.pageCount) * el.target.id;
        let started = ended - this.pageCount;

        this.home.getPost({'end': ended, 'start': started}).subscribe((data) => {

            if (!data) {
                return false;
            }

            if (!data['status'] && data['status'] == 0) {
                alert('Empty data!!');
                return false;
            }

            this.posts = data['result'];
        });

        /*    for (let i = started; i < ended; i++) {

              if (typeof this.postData['result'][i] == 'undefined') {
                break;
              }

              this.start = i;
              this.posts.push(this.postData['result'][i]);
            }*/
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

    checkUser() {
        let userLoggined = localStorage.getItem('userInf');
        if (typeof userLoggined == 'undefined') {
            return false;
        }

        let userInf = JSON.parse(userLoggined);

        if (userInf == null) {
            return false;
        }

        if (userInf['userInf'] == '') {
            return false;
        }
        return true;
    }

    /**
     * Infinite scroll handler
     * @param e
     * @param index
     */
    onIntersection(e, index) {
        if (index === this.filteredPosts.news.length - 1) {
            ++this.page;
            this.home.getData(this.page).subscribe((data: any) => {

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

}
