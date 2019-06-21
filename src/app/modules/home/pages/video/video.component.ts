import {Component, OnInit} from '@angular/core';
import * as Base from '../../../../configs/config';
import {HomeService} from '../../../../services/home.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {SubjectService} from '../../../../services/subject.service';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

    constructor(private home: HomeService, private router: Router, private subject: SubjectService) {
    }

    posts: any = [];
    base = Base.imgPath;
    userLoggined: any = [];
    pageCount = 3;
    start = 0;
    // /*  postData: any = [];*/
    count = 0;
    pages = [];
    searchTerm;

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
        this.home.getVideo().subscribe((data) => {

            data['news'].sort((a, b) => {
                return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
            });


            /*  this.postData = data;*/
            this.count = data['count'];
            this.posts = data;
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
