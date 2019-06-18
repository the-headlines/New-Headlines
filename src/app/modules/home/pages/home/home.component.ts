import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../../../services/home.service';
import * as Base from '../../../../configs/config.js';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';

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
    baseArr = [
        {
            title: 'Title1',
            extractedDescription: 'Desc1',
            extractedImage: 'https://vignette.wikia.nocookie.net/lovecraft/images/c/cf/Screenshot_20171018-093500.jpg/revision/latest' +
                '?cb=20171020174137',
            views: '0',
            like: '1',
            important: '2',
            interesting: '3'
        },
        {
            title: 'Title2',
            extractedDescription: 'Desc2',
            extractedImage: 'https://vignette.wikia.nocookie.net/lovecraft/images/c/cf/Screenshot_20171018-093500.jpg/revision/latest' +
                '?cb=20171020174137',
            views: '0',
            like: '2',
            important: '3',
            interesting: '1'
        },
        {
            title: 'Title3',
            extractedDescription: 'Desc3',
            extractedImage: 'https://vignette.wikia.nocookie.net/lovecraft/images/c/cf/Screenshot_20171018-093500.jpg/revision/latest' +
                '?cb=20171020174137',
            views: '0',
            like: '3',
            important: '1',
            interesting: '2'
        }
    ];
    fakeArr = [];
    currentPost = {};
    changeText: boolean;

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

    constructor(private home: HomeService, private router: Router, private cs: CookieService, private http: HttpClient) {
        this._sessionId = cs.get('sessionId');
        this.http.get<{ ip: string }>('https://jsonip.com').subscribe(data => {
            console.log('th data', data);
            this.ipAddress = data;
        });

        this.changeText = false;
    }

    ngOnInit() {

        if (this.checkUser()) {
            this.userLoggedIn = JSON.parse(localStorage.getItem('userInf'));
        }

        this.get();

        this.cs.set('Test', 'Hello World');
        // console.log(this.cs.get('Test'));
    }

    isShown: boolean = false;

    show(single) {
        this.isShown = true;
        this.currentPost = single;
    }

    public set sessionId(value: string) {
        this._sessionId = value;
        this.cs.set('sessionId', value);
    }

    get() {
        this.home.getData().subscribe((data) => {

            if (!data) {
                return false;
            }

            if (!data[status] && data[status] === 0) {
                alert('No data');
                return false;
            }

            /*  this.postData = data;*/
            this.count = data['count'];
            this.pagimate(data);
            this.posts = data;
            return this.posts;
        });
    }

    pagimate(data) {

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
            this.pagimate(data);
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
            this.pagimate(data);
            this.messages = data;
            return this.messages;
        });
    }
}
