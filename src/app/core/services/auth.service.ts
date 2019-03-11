import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Base from '../../configs/config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    public testModels(data) {
        return this.http.post(Base.url + '/login', data);
    }

    public getPosts() {
        return this.http.get(Base.url + '/all_ferry');
    }

    public checkLogin(data) {
        return this.http.post(Base.url + '/login', data);
    }

    public register(data) {
        return this.http.post(Base.url + '/registration', data);
    }

    public getContact(data) {
        return this.http.post(Base.url + '/contact_us', data);
    }

}


