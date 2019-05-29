import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Post} from '../post';
import {Observable} from 'rxjs';

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
        return this.http.get(Base.url + '/all_ferry');
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
        return this.http.post(Base.url + '/contact_us', data);
    }

    public getToken() {
        return localStorage.getItem('token');
    }
}


