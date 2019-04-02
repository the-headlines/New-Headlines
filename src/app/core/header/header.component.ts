import {Component, OnInit} from '@angular/core';
import {ModalDialog} from '../../modules/home/components/libs/modal.dialog';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private dialog: MatDialog) {
    }

    userLoggined: any = [];

    ngOnInit() {
        if (this.checkUser()) {
            this.userLoggined = JSON.parse(localStorage.getItem('userInf'));
        }

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

        if (userInf['admin_session_inf'] == '') {
            return false;
        }

        return true;
    }

    showLogin() {
        ModalDialog.openDialog(1, this.dialog);
    }
}
