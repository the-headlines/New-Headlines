import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../../../services/home.service';
import * as Base from '../../../../configs/config.js';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import {SubjectService} from '../../../../services/subject.service';
import {GenerateSaveNonAuthUserIdPipe} from '../../../../shared/pipes/generate-save-non-auth-user-id.pipe';

@Component({
    selector: 'app-road',
    templateUrl: './road.component.html',
    styleUrls: ['./road.component.scss']
})
export class RoadComponent implements OnInit {

    private _sessionId: string;
    posts: any = [];
    base = Base.imgPath;
    userLoggedIn: any = [];
    pageCount = 3;
    start = 0;
    count = 0;
    pages = [];
    messages: any = [];
    ipAddress: any;
    searchTerm = '';
    filteredPosts: any = {news: []};
    page = 1;
    selectedFilter = {vote: 'All', type: 'New'};

    constructor(
        private home: HomeService,
        private router: Router,
        private cs: CookieService,
        private http: HttpClient,
        private subject: SubjectService,
        private nonAuthId: GenerateSaveNonAuthUserIdPipe
    ) {
        this._sessionId = cs.get('sessionId');
        // this.http.get<{ ip: string }>('https://jsonip.com').subscribe(data => {
        //     console.log('th data', data);
        //     this.ipAddress = data;
        // });
    }

    public set sessionId(value: string) {
        this._sessionId = value;
        this.cs.set('sessionId', value);
    }

    ngOnInit() {

        if (this.checkUser()) {
            this.userLoggedIn = JSON.parse(localStorage.getItem('userInf'));
        }

        this.subject.getSearch().subscribe(s => {
            this.searchTerm = s;
        });

        this.get();

        // Generating & saving non-auth user id in a cookie if not set
        this.nonAuthId.transform();

        this.cs.set('Test', 'Hello World');
        // console.log(this.cs.get('Test'));
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

    get() {
        this.home.getRoadToFame(this.page).subscribe((data) => {

            if (!data) {
                return false;
            }

            if (!data[status] && data[status] === 0) {
                alert('No data');
                return false;
            }

            data['news'].sort((a, b) => {
                return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
            });

            /*  this.postData = data;*/
            this.count = data['count'];
            this.paginate(data);
            this.posts = data;
            this.filteredPosts.news = data['news'];
        });
    }

    paginate(data) {

        this.posts = data['result'];

        const cnt = Math.ceil(this.count / this.pageCount);

        for (let i = 1; i <= cnt; i++) {
            this.pages.push(i);
        }
    }

    nextPage(el) {
        this.posts = [];
        const ended = (this.pageCount) * el.target.id;
        const started = ended - this.pageCount;

        this.home.getPost({end: ended, start: started}).subscribe((data) => {

            if (!data) {
                return false;
            }

            if (!data[status] && data[status] === 0) {
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

    getSinglePost(id) {
        this.router.navigate(['/post', id]);
    }

    checkUser() {
        let userLoggined = localStorage.getItem('userInf');
        if (typeof userLoggined === 'undefined') {
            return false;
        }

        let userInf = JSON.parse(userLoggined);

        if (userInf == null) {
            return false;
        } else if (userInf[userInf] === '') {
            return false;
        }
        return true;
    };

    getVoice() {
        this.home.getVoiceValue().subscribe((data) => {

            if (!data) {
                return false;
            }

            if (!data[status] && data[status] === 0) {
                alert('No data');
                return false;
            }

            /*  this.postData = data;*/
            this.count = data['count'];
            this.paginate(data);
            this.messages = data;
            return this.messages;
        });
    };


    logMessageId(el) {
        let messageId = el.getAttribute('data-message-id');
        //let messageId = el.dataset.messageId;
        console.log('Message Id: ', messageId);

        this.home.setVoiceValue(el).subscribe((data) => {

            if (!data) {
                return false;
            }

            if (!data[status] && data[status] === 0) {
                alert('No data');
                return false;
            }

            /*  this.postData = data;*/
            this.count = data['count'];
            this.paginate(data);
            this.messages = data;
            return this.messages;
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
            this.home.getRoadToFame(this.page).subscribe((data: any) => {

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
            });
        });
    }

    filterByVotes(vote) {
        this.selectedFilter.vote = vote;
        this.home.getPostsByVoteType('StyleAndSweat', vote, this.selectedFilter.type).subscribe((dt: any) => {
            this.posts = dt;
            this.filteredPosts.news = dt.news;
        });
    }

    filterByType(e) {
        this.selectedFilter.type = e.target.value;
        this.home.getPostsByVoteType('StyleAndSweat', this.selectedFilter.vote, this.selectedFilter.type).subscribe((dt: any) => {
            this.posts = dt;
            this.filteredPosts.news = dt.news;
        });
    }
}
