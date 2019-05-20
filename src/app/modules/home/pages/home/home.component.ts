import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../../../services/home.service';
import * as Base from '../../../../configs/config.js';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    private _sessionId: string;

    constructor(private home: HomeService, private router: Router, private cs: CookieService) {
        this._sessionId = cs.get('sessionId');
    }

    public set sessionId(value: string) {
        this._sessionId = value;
        this.cs.set('sessionId', value);
    }

    posts: any = [];
    base = Base.imgPath;
    userLoggined: any = [];
    pageCount = 3;
    start = 0;
    /*  postData: any = [];*/
    count = 0;
    pages = [];

    messages: any = [];

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

    // messages = [
    //     {
    //         id: 'like',
    //         text: 'Like'
    //     },
    //     {
    //         id: 'important',
    //         text: 'Important'
    //     },
    //     {
    //         id: 'interesting',
    //         text: 'Interesting'
    //     }
    // ];

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

    ngOnInit() {

        if (this.checkUser()) {
            this.userLoggined = JSON.parse(localStorage.getItem('userInf'));
        }

        this.get();

        this.cs.set('Test', 'Hello World');
        console.log(this.cs.get('Test'));

        this.getVoice();
    }

    //cookies
    setCookie() {
        alert(this.cs.set('test', 'testing cookie', 12));
    }

    getCookie() {
        alert(this.cs.get('test'));
    }

    delCookie() {
        alert(this.cs.deleteAll('test'));
    }

    // vote = {like: false, important: false, interesting: false};

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
        this.router.navigate(['/posts', id]);
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
    }
}
