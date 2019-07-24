import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {HomeService} from '../../../../services/home.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {SubjectService} from '../../../../services/subject.service';
import {ToastrService} from 'ngx-toastr';
import {GenerateSaveNonAuthUserIdPipe} from '../../../../shared/pipes/generate-save-non-auth-user-id.pipe';
import {AuthService} from '../../../../services/auth.service';

@Component({
    selector: 'app-hobbyist',
    templateUrl: './hobbyist.component.html',
    styleUrls: ['./hobbyist.component.sass']
})
export class HobbyistComponent implements OnInit {
    posts: any = [];
    searchTerm = '';
    page = 1;
    filteredPosts: any = {news: []};

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

        this.home.getHobbyist(this.page).subscribe((dt: any) => {
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

    incrementViews(single) {
        this.home.updateViewCount(single).subscribe(dt => {
            this.home.getSinglePost(single._id).subscribe((d: any) => {
                single.views = d.views;
            });
        });
    }
}