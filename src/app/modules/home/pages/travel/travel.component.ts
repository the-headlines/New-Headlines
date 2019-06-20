import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../../../services/home.service';
import * as moment from 'moment';

@Component({
    selector: 'app-travel',
    templateUrl: './travel.component.html',
    styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {
    posts: any = [];

    constructor(
        private home: HomeService
    ) {
    }

    ngOnInit() {
        this.getPosts();
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
