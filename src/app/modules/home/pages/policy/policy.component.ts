import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-policy',
    templateUrl: './policy.component.html',
    styleUrls: ['./policy.component.sass']
})
export class PolicyComponent implements OnInit {

    @ViewChild('cookie_policy') cookiePolicy;

    constructor() {
    }

    ngOnInit() {
        if (this.cookiePolicy) {

            this.scroll(this.cookiePolicy);
        }
    }

    scroll(el: HTMLElement) {
        // let el = document.getElementById('cookie-policy');
        el.scrollIntoView();
    }

}
