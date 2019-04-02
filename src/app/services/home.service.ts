import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Base from '../configs/config';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient) {
    }

    getData() {
        return this.http.get(Base.url + '/home');
    }

    public getPost(data) {
        return this.http.post(Base.url + '/home', data);
    }

    public getVideo(data) {
        return this.http.post(Base.url + '/video', data);
    }

    public getSinglePost(id) {
        return this.http.get(Base.url + '/single/' + id + '');
    }

    public addComments(data) {
        return this.http.post(Base.url + '/add_comment', data);
    }

    public comments(data) {
        return this.http.post(Base.url + '/comment', data);
    }

}
