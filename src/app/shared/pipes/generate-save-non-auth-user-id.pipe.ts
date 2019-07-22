import {Pipe, PipeTransform} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ngx-cookie-service';

@Pipe({
    name: 'generateSaveNonAuthUserId'
})
export class GenerateSaveNonAuthUserIdPipe implements PipeTransform {

    notAuthUserId = this.cookie.get('uniqueUserId');

    constructor(
        private auth: AuthService,
        private cookie: CookieService
    ) {

    }

    transform(): any {
        // Setting non-auth userId cookie
        if (!this.notAuthUserId && !this.auth.loggedIn()) {

            const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
                s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
            this.cookie.set('uniqueUserId', ObjectId());
        }

        return this.notAuthUserId;
    }

}
