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
    }


    ngAfterViewInit(): void {
        if (this.cookiePolicy) {
            this.cookiePolicy.nativeElement.scrollIntoView();
        }
    }
}
