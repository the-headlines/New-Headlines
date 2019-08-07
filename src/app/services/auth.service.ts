import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import * as Base from '../configs/config';

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
        return this.http.post(Base.url + '/api/news', data);
    }

    public getPosts() {
        return this.http.get(Base.url + '/');
    }

    public checkLogin(data) {
        let headers = new HttpHeaders().set('Authorization', 'token');
        return this.http.post(Base.url + '/api/user/login', data, {headers});
    }

    public register(data) {
        let headers = new HttpHeaders().set('Authorization', 'token');
        return this.http.post(Base.url + '/api/user/signup', data, {headers});
    }

    public getContact(data) {
        return this.http.post(Base.url + '/', data);
    }

    public getToken() {
        return localStorage.getItem('token');
    }

    public updateProfile(data) {
        return this.http.put(Base.url + '/api/user/details', data);
    }

    updatePassword(data) {
        return this.http.put(Base.url + '/api/user/pwd', data);
    }

    /**
     * Checks to see if user logged in/ token expired
     */
    loggedIn() {
        return !this.jwtHelper.isTokenExpired();
    }
}


