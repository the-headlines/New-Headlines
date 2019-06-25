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
        return this.http.get(Base.url + '/api/news/category/HookedNews?pagesize=100&page=1');
    }

    getPictures() {
        return this.http.get(Base.url + '/api/news/category/CameraPictures?pagesize=100&page=1');
    }

    getRoadToFame() {
        return this.http.get(Base.url + '/api/news/category/RoadToFame?pagesize=100&page=1');
    }

    getDeals() {
        return this.http.get(Base.url + '/api/news/category/FantasticDeals?pagesize=100&page=1');
    }

    getCommerce() {
        return this.http.get(Base.url + '/api/news/category/JumpStartups?pagesize=100&page=1');
    }

    getTravel() {
        return this.http.get(Base.url + '/api/news/category/TravelMonkey?pagesize=100&page=1');
    }

    getVoiceValue() {
        return this.http.get(Base.url + '/api/news');
    }

    setVoiceValue(data) {
        return this.http.post(Base.url + '/api/news', data);
    }

    public getPost(data) {
        return this.http.post(Base.url + '/api/news?pagesize=100&page=1', data);
    }

    public getVideo() {
        return this.http.get(Base.url + '/api/news/category/Videos?pagesize=100&page=1');
    }

    public getSinglePost(id) {
        return this.http.get(Base.url + '/api/news/' + id + '');
    }

    public getPostVotes(id) {
        return this.http.get(Base.url + '/api/news/' + id + '/vote');
    }

    doVoting(id,data) {
        return this.http.post(Base.url + '/api/news/' + id + '/vote', data);
    }

    /*Add comment*/
    public addComments(data) {
        return this.http.post(Base.url + '/api/comments', data);
    }

    /**/
    public comments(data) {
        return this.http.post(Base.url + '/comment', data);
    }

    /*Delete comment*/
    public deleteComments(data) {
        return this.http.post(Base.url + '/api/comments/5c5d54055f84b2158d165ba6', data);
    }

    /*Update Comment*/
    public updateComment(data) {
        return this.http.put(Base.url + '/api/comments/5c5d557278aa771609b3ece5', data);
    }
}
