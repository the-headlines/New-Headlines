import {Component, OnInit} from '@angular/core';
import {ADMIN_SIDEBAR_LINKS} from '../../shared/constants/main';
import {Router} from '@angular/router';

@Component({
    selector: 'app-admin-sidebar',
    templateUrl: './admin-sidebar.component.html',
    styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

    sidebarLinks = ADMIN_SIDEBAR_LINKS;

    constructor(
        public router: Router
    ) {
    }

    ngOnInit() {
    }

}
