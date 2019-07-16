import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HomeService} from '../../../../services/home.service';
import * as Base from '../../../../configs/config.js';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {SubjectService} from '../../../../services/subject.service';
import {SearchNewsPipe} from '../../../../shared/pipes/search-news.pipe';
import {FilterPipe} from 'ngx-filter-pipe';
import * as psl from 'psl';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

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
    fakeArr = [];
    filteredPosts: any = {news: []};
    searchTerm = '';
    currentPost = {};
    defaultRecords = 5;
    scrolledPostsCount = 0;

    @ViewChild('paginator') paginator;
    @ViewChild('post') element: ElementRef;

    filterByVotes(vote) {
        function compare(a, b) {
            if (a[vote] < b[vote]) {
                return 1;
            }
            if (a[vote] > b[vote]) {
                return -1;
            }
            return 0;
        }

        this.fakeArr = this.fakeArr.sort(compare);
        console.log(this.fakeArr);

        localStorage.setItem('isLoggedIn', 'true');
    }

    constructor(
        private home: HomeService,
        private router: Router,
        private cs: CookieService,
        private http: HttpClient,
        private subject: SubjectService,
        private toastr: ToastrService
    ) {
        this._sessionId = cs.get('sessionId');
        // this.http.get<{ ip: string }>('https://jsonip.com').subscribe(data => {
        //     console.log('th data', data);
        //     this.ipAddress = data;
        // });
    }

    ngOnInit() {
        // if (this.checkUser()) {
        //     this.userLoggedIn = JSON.parse(localStorage.getItem('userInf'));
        // }
        // this.cs.set('Test', 'Hello World');
        this.get();
        this.subject.getSearch().subscribe(s => {
            this.searchTerm = s;
        });

        // this.toastr.success('Hello from here', '', {disableTimeOut: true});
    }

    // public set sessionId(value: string) {
    //     this._sessionId = value;
    //     this.cs.set('sessionId', value);
    // }

    get() {
        this.home.getData().subscribe((data: any) => {

            data['news'].sort((a, b) => {
                return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
            });

            this.posts = data;
            this.filteredPosts.news = data.news; //.slice(0, this.defaultRecords)

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

    paginate(data) {
        this.posts = data;
        this.count = data['count'];
        // console.log(this.count, 'pagination');

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
    }

    getSingle(id) {
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
    }

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

    handle(e) {
        this.filteredPosts.news = this.posts.news.slice(e.pageIndex * e.pageSize,
            e.pageIndex * e.pageSize + e.pageSize);
    }

    getLength(d) {
        return d ? d.length : 0;
    }

    onScroll(e) {
        ++this.scrolledPostsCount;
        console.log(e);
    }

    onScrollUp(e) {
        console.log(e);
    }
}
