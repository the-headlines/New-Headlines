import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalDialog} from '../../modules/home/components/libs/modal.dialog';
import {MatDialog} from '@angular/material';
import {SocialUser} from 'angularx-social-login';

import {AuthService} from 'angularx-social-login';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    private user: SocialUser;
    @ViewChild('closest') closest: ElementRef;
    constructor(private dialog: MatDialog, private authService: AuthService) {
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

        else if (userInf['admin_session_inf'] == '') {
            return false;
        }

        return true;
    }

    showLogin() {
        ModalDialog.openDialog(1, this.dialog);
    }

    signOut(): void {
        this.authService.signOut();
        localStorage.setItem('userInf', null);
    }
}
