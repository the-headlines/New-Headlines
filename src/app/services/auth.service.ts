import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import {API_URL} from '../shared/constants/main';

// JWT helper
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    userData;

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService) {
    }

    public uploadPost(data) {
        return this.http.post(API_URL + '/api/news', data);
    }

    public getPosts() {
        return this.http.get(API_URL + '/');
    }

    public checkLogin(data) {
        let headers = new HttpHeaders().set('Authorization', 'token');
        return this.http.post(API_URL + '/api/user/login', data, {headers});
    }

    public register(data) {
        let headers = new HttpHeaders().set('Authorization', 'token');
        return this.http.post(API_URL + '/api/user/signup', data, {headers});
    }

    public getContact(data) {
        return this.http.post(API_URL + '/api/general/feedback', data);
    }

    public getToken() {
        return localStorage.getItem('token');
    }

    public updateProfile(data) {
        return this.http.put(API_URL + '/api/user/details', data);
    }

    updatePassword(data) {
        return this.http.put(API_URL + '/api/user/pwd', data);
    }

    sendForgotPassRequest1(data) {
        return this.http.post(API_URL + '/api/user/forgot-password', data);
    }

    /**
     * Checks to see if user logged in/ token expired
     */
    loggedIn() {
        return !this.jwtHelper.isTokenExpired();
    }
}


