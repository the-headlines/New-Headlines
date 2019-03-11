import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../../../core/services/home.service';
import * as Base from '../../../../configs/config.js';
import {Router} from '@angular/router';

@Component({
    selector: 'app-commerce',
    templateUrl: './commerce.component.html',
    styleUrls: ['./commerce.component.scss']
})
export class CommerceComponent implements OnInit {

    constructor(private home: HomeService, private router: Router) {
    }

    posts: any = [];
    base = Base.imgPath;
    userLoggined: any = [];
    pageCount = 3;
    start = 0;
    /*  postData: any = [];*/
    count = 0;
    pages = [];

    ngOnInit() {

        if (this.checkUser()) {
            this.userLoggined = JSON.parse(localStorage.getItem('userInf'));
        }

        this.get();
    }

    get() {
        this.home.getData().subscribe((data) => {

            if (!data) {
                return false;
            }

            if (!data['status'] && data['status'] == 0) {
                alert('No data');
                return false;
            }

            /*  this.postData = data;*/
            this.count = data['count'];
            this.pagimate(data);
        });
    }

    pagimate(data) {

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

        this.home.getPost({"end": ended, "start": started}).subscribe((data) => {

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

    getSingle(id) {
        this.router.navigate(['/posts', id]);
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
}
