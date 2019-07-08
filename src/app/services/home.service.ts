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
        return this.http.get(Base.url + '/api/news/category/Influence?pagesize=30&page=1');
    }

    getVotesData() {
        return this.http.get(Base.url + '');
    }

    getPictures() {
        return this.http.get(Base.url + '/api/news/category/CameraPictures?pagesize=30&page=1');
    }

    getRoadToFame() {
        return this.http.get(Base.url + '/api/news/category/StyleAndSweat?pagesize=30&page=1');
    }

    getDeals() {
        return this.http.get(Base.url + '/api/news/category/LoveDesigns?pagesize=30&page=1');
    }

    getCommerce() {
        return this.http.get(Base.url + '/api/news/category/JumpStartups?pagesize=30&page=1');
    }

    getTravel() {
        return this.http.get(Base.url + '/api/news/category/HumanStories?pagesize=30&page=1');
    }

    getPostsByCategory(category) {
        return this.http.get(`${Base.url}/api/user/news/${category}?pagesize=30&page=1`);
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

    doVoting(id, data) {
        let urlPart;
        if (data === 'Like') {
            urlPart = 'likeunlike';
        }
        return this.http.post(Base.url + '/api/comments/' + id + '/' + urlPart, {});
    }

    /*Add comment*/
    public addComments(data) {
        return this.http.post(Base.url + '/api/news/' + data.newsId + '/comment', data);
    }

    getCommentsForPost(id) {
        return this.http.get(Base.url + '/api/news/' + id + '/comments/' + '?pagesize=100&page=1');
    }

    /**/
    public comments(data) {
        return this.http.post(Base.url + '/comment', data);
    }

    /*Delete comment*/
    public deleteComment(id) {
        return this.http.delete(Base.url + '/api/comments/' + id);
    }

    /*Update Comment*/
    public updateComment(data) {
        return this.http.put(Base.url + '/api/comments/' + data.id, data);
    }
}
