import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ModalDialog} from '../../modules/home/components/libs/modal.dialog';
import {MatDialog} from '@angular/material';
import {SocialUser} from 'angularx-social-login';
import {AuthService as authS} from 'angularx-social-login';
import {AuthService} from '../../services/auth.service';
import {CommonService} from '../../services/common.service';
import {SubjectService} from '../../services/subject.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {hasOwnProperty} from 'tslint/lib/utils';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    private user: SocialUser;
    @ViewChild('closest') closest: ElementRef;
    userData: any = {};
    searchForm;
    searchAllowed = false;
    isShown = false;
    show = false;

    constructor(
        private dialog: MatDialog,
        private authService: authS,
        public auth: AuthService,
        private common: CommonService,
        private subject: SubjectService,
        public router: Router,
        private route: ActivatedRoute,
        private _fb: FormBuilder,
        private renderer: Renderer2
    ) {

        this.searchForm = this._fb.group({
            searchTerm: ''
        });

        this.subject.getUserData().subscribe((dt: any) => {
            this.userData.fullName = dt.fullName;
        });

        this.subject.getDialogState().subscribe((dt) => {
            if (dt.state === 'closed') {
                ModalDialog.openDialog(dt.dialog === 'login' ? 2 : 1, this.dialog);
            }
        });

        this.route.data.subscribe(dt => {
            if (dt.hasOwnProperty('search')) {
                this.searchAllowed = dt.search;
            }
        });

        this.userData.fullName = localStorage.getItem('full_name');
    }

    baseArr = [
        {
            title: 'Title1',
            extractedDescription: 'Desc1',
            extractedImage: 'https://vignette.wikia.nocookie.net/lovecraft/images/c/cf/Screenshot_20171018-093500.jpg/revision/latest' +
                '?cb=20171020174137',
            views: '0',
            like: '1',
            important: '2',
            interesting: '3'
        },
        {
            title: 'Title2',
            extractedDescription: 'Desc2',
            extractedImage: 'https://vignette.wikia.nocookie.net/lovecraft/images/c/cf/Screenshot_20171018-093500.jpg/revision/latest' +
                '?cb=20171020174137',
            views: '0',
            like: '2',
            important: '3',
            interesting: '1'
        },
        {
            title: 'Title3',
            extractedDescription: 'Desc3',
            extractedImage: 'https://vignette.wikia.nocookie.net/lovecraft/images/c/cf/Screenshot_20171018-093500.jpg/revision/latest' +
                '?cb=20171020174137',
            views: '0',
            like: '3',
            important: '1',
            interesting: '2'
        }
    ];
    fakeArr = [];
    userLoggined: any = [];

    search_input = {value: ''};

    search(keyword) {
        var searchArr = JSON.parse(JSON.stringify(this.baseArr));

        searchArr = searchArr.filter(val => {
            return val.extractedDescription.search(keyword) > -1 || keyword === '';
        });

        this.fakeArr = searchArr;
    }

    toggleShow() {
        this.isShown = !this.isShown;
        // console.log('button click');
    }

    openNot() {
        this.show = !this.show;
        // console.log('button click');
    }

    ngOnInit() {
        if (this.checkUser()) {
            this.userLoggined = JSON.parse(localStorage.getItem('userInf'));
        }
    }

    goToLink(link) {
        this.router.navigate([link]);
        window.scrollTo(0, 0);
    }

    checkUser() {
        let userLoggined = localStorage.getItem('userInf');

        if (typeof userLoggined == 'undefined') {
            return false;
        }

        let userInf = JSON.parse(userLoggined);

        if (userInf == null) {
            return false;
        } else if (userInf['admin_session_inf'] == '') {
            return false;
        }

        return true;
    }

    showLogin() {
        ModalDialog.openDialog(1, this.dialog);
    }

    doSearch() {
        this.subject.setSearch(this.searchForm.value['searchTerm']);
    }

    logOut(): void {
        this.authService.signOut();
        localStorage.setItem('userInf', null);
        localStorage.setItem('token', '');
        localStorage.setItem('full_name', null);
        this.router.navigate(['/']);
    }
}
