import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-science',
    templateUrl: './science.component.html',
    styleUrls: ['./science.component.sass']
})
export class ScienceComponent implements OnInit {
    posts = {news: []};

    constructor() {
    }

    ngOnInit() {
    }

}
