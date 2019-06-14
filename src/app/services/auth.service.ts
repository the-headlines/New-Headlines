import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import * as Base from '../configs/config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    public uploadPost(data) {
        return this.http.post(Base.url + '/api/user/post', data);
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
}


