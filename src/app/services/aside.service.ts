import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {API_URL} from '../shared/constants/main';

@Injectable({
    providedIn: 'root'
})
export class AsideService {

    constructor(private http: HttpClient,
                private auth: AuthService) {
    }

    public getTopNews(category) {
        return this.http.get(API_URL + '/api/news/' + this.checkAuth() + 'category/' + category + '?pagesize=10&page=1&filter=Score');
    }

    checkAuth() {
        return this.auth.loggedIn() ? 'user/voted/' : '';
    }
}
