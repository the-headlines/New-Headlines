import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-policy',
    templateUrl: './policy.component.html',
    styleUrls: ['./policy.component.sass']
})
export class PolicyComponent implements OnInit, AfterViewInit {

    @ViewChild('cookie_policy') cookiePolicy;
    policy;

    constructor(
        public route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.policy = this.route.snapshot.params['name'];
        // console.log(this.route.snapshot.paramMap)
        // console.log(this.policy)
    }


    ngAfterViewInit(): void {
        if (this.cookiePolicy && this.policy) {
            this.cookiePolicy.nativeElement.scrollIntoView();
        }
    }
}
