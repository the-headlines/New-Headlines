import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../shared/constants/main';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) {
    }

    public postData(data) {
        return this.http.post(API_URL + '/api/news?=', data);
    }

    public getPost(id) {
        return this.http.get(API_URL + '/api/news/' + id);
    }

    public update(id, data) {
        return this.http.put(API_URL + '/api/news/' + id, data);
    }

    public remove(id) {
        return this.http.delete(API_URL + '/api/news/' + id);
    }

    public updateUserInfo(data) {
        return this.http.put(API_URL + '/api/news/5c5bf87d37803a331d79a6f5', data);
    }

    updateSharesCount(id, sMedia) {
        return this.http.post(API_URL + '/api/news/' + id + '/shares/' + sMedia, {});
    }
}
