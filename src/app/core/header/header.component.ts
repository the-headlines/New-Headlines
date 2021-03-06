import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
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
import {MAIN_SECTIONS} from '../../shared/constants/main';
import {EditInfoModalComponent} from '../../modules/home/components/libs/edit-info-modal/edit-info-modal.component';
import {FeedbackComponent} from '../../modules/home/pages/feedback/feedback.component';
import {FacebookService, InitParams} from 'ngx-facebook';
import {MatMenuTrigger} from '@angular/material';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    private user: SocialUser;
    @ViewChild('closest') closest: ElementRef;
    @ViewChild('authMenu') menu: ElementRef;
    @ViewChild('toggler') menuToggler: ElementRef;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    userData: any = {};
    searchForm;
    searchAllowed = false;
    isShown = false;
    show = false;
    sections = MAIN_SECTIONS;
    scrollPosition = 0;
    showScrollToTopBtn = false;
    postCategory = this.router.url === '/' ? 'Influence' : '';


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

    @HostListener('window:scroll', ['$event'])
    private onScroll(e: Event): void {
        this.scrollPosition = window.pageYOffset;

        this.showScrollToTopBtn = window.pageYOffset > 1800;
    }

    constructor(
        private dialog: MatDialog,
        private authService: authS,
        public auth: AuthService,
        private common: CommonService,
        private subject: SubjectService,
        public router: Router,
        private route: ActivatedRoute,
        private _fb: FormBuilder,
        private renderer: Renderer2,
        private fb: FacebookService
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

        this.subject.getPostCategory().subscribe(category => {
            this.postCategory = category;
        });

        this.route.data.subscribe(dt => {
            if (dt.hasOwnProperty('search')) {
                this.searchAllowed = dt.search;
            }
        });

        this.userData.fullName = localStorage.getItem('full_name');
    }


    ngOnInit() {


        this.renderer.listen('window', 'click', (e: Event) => {
            if (e.target === this.menuToggler.nativeElement) {
                this.isShown = !this.isShown;
            } else {
                this.isShown = false;
            }
        });


        if (this.checkUser()) {
            this.userLoggined = JSON.parse(localStorage.getItem('userInf'));
        }

        const params: InitParams = {
            version: 'v2.8'
        };

        this.fb.init(params);
    }

    openMyMenu() {
        this.trigger.openMenu();
    }

    search(keyword) {
        var searchArr = JSON.parse(JSON.stringify(this.baseArr));

        searchArr = searchArr.filter(val => {
            return val.extractedDescription.search(keyword) > -1 || keyword === '';
        });

        this.fakeArr = searchArr;
    }

    hideDiv(trigger) {
        if (trigger) {
            trigger.closeMenu();
        }
        this.isShown = false;
    }

    openNot() {
        this.show = !this.show;
        // console.log('button click');
    }


    goToLink(link) {
        this.checkConfirmation(link);
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

    checkConfirmation(link) {
        if (this.router.url === '/add-post') {

            const c = confirm('Are you sure you want to discard the post?');
            if (c) {
                this.router.navigate([link]);
            } else {
                this.router.navigate(['/add-post']);
            }

            return false;
        } else {

            this.router.navigate([link]);
            window.scrollTo(0, 0);
            return true;
        }
    }

    logOut(): void {
        // this.authService.signOut();
        localStorage.setItem('userInf', null);
        localStorage.setItem('token', '');
        localStorage.setItem('full_name', null);
        this.router.navigate(['/']);
    }

    openDialog(term): void {
        const dialogRef = this.dialog.open(FeedbackComponent, {
            width: '500px',
            data: {
                name: term
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}


