import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../../../services/home.service';
import * as moment from 'moment';
import {SubjectService} from '../../../../services/subject.service';

@Component({
    selector: 'app-travel',
    templateUrl: './travel.component.html',
    styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {
    posts: any = [];
    searchTerm = '';

    constructor(
        private home: HomeService,
        private subject: SubjectService
    ) {
    }

    ngOnInit() {
        this.getPosts();
        this.subject.getSearch().subscribe(s => {
            this.searchTerm = s;
        });
    }

    getPosts() {
        this.home.getTravel().subscribe(dt => {

            dt['news'].sort((a, b) => {
                return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
            });

            this.posts = dt;

        });
    }

}
