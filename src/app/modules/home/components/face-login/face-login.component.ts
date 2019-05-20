import {Component, OnInit} from '@angular/core';
import {AuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {FacebookLoginProvider} from 'angularx-social-login';


@Component({
    selector: 'app-face-login',
    templateUrl: './face-login.component.html',
    styleUrls: ['./face-login.component.scss']
})


export class FaceLoginComponent implements OnInit {
    private user: SocialUser;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.authState.subscribe((user) => {
            this.user = user;
        })
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.authService.signOut();
    }
}
