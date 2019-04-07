import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    editText(el) {
        switch (el) {
            case 'pass':
                if (this['pass'] == false) {
                    this['pass'] = true;
                } else {
                    this['pass'] = false;
                }
                break;
            case 'email':
                if (this['email'] === false) {
                    this['email'] = true;
                } else {
                    this['email'] = false;
                }
                break;
            case 'name':
                if (this['name'] == false) {
                    this['name'] = true;
                } else {
                    this['name'] = false;
                }
                break;
        }
    }
}
