import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Base from '../configs/config';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) {
    }

    public postData(data) {
        return this.http.post(Base.url + '/api/news?=', data);
    }

    public getPosts() {
        return this.http.get(Base.url + '/all_ferry');
    }

    public deletePosts() {
        return this.http.delete(Base.url + '/api/news/5c5bee3e9e51fd2fd2b05200');
    }

    public updateUserInfo(data) {
        return this.http.put(Base.url + '/api/news/5c5bf87d37803a331d79a6f5', data);
    }
}
