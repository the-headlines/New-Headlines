import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Base from '../configs/config';
import {AuthService} from './auth.service';
import {SubjectService} from './subject.service';
import * as jwtDecode from 'jwt-decode';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient, private auth: AuthService, private subject: SubjectService, private cookie: CookieService) {
    }

    getData(page) {
        return this.http.get(Base.url + '/api/news/' + this.checkAuth() + 'category/Influence?pagesize=30&page=' + page);
    }

    getVotesData(category) {
        return this.http.get(Base.url + '/api/news/' + this.checkAuth() + 'category/' + category + '?pagesize=30&page=1');
    }

    getPictures(page) {
        return this.http.get(Base.url + '/api/news/' + this.checkAuth() + 'category/CameraPictures?pagesize=30&page=' + page);
    }

    getRoadToFame(page) {
        return this.http.get(Base.url + '/api/news/' + this.checkAuth() + 'category/StyleAndSweat?pagesize=30&page=' + page);
    }

    getDeals(page) {
        return this.http.get(Base.url + '/api/news/' + this.checkAuth() + 'category/LoveDesigns?pagesize=30&page=' + page);
    }

    getCommerce(page) {
        return this.http.get(Base.url + '/api/news/' + this.checkAuth() + 'category/JumpStartups?pagesize=30&page=' + page);
    }

    getTravel(page) {
        return this.http.get(Base.url + '/api/news/' + this.checkAuth() + 'category/HumanStories?pagesize=30&page=' + page);
    }

    getHobbyist(page) {
        return this.http.get(Base.url + '/api/news/' + this.checkAuth() + 'category/Hobbyist?pagesize=30&page=' + page);
    }

    getScience(page) {
        return this.http.get(Base.url + '/api/news/' + this.checkAuth() + 'category/Science?pagesize=30&page=' + page);
    }

    getPublic(page) {
        return this.http.get(Base.url + '/api/news/' + this.checkAuth() + 'category/Public?pagesize=30&page=' + page);
    }

    getEnvironment(page) {
        return this.http.get(Base.url + '/api/news/' + this.checkAuth() + 'category/Environment?pagesize=30&page=' + page);
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

    public getVideo(page) {
        return this.http.get(Base.url + '/api/news/' + this.checkAuth() + 'category/Science?pagesize=100&page=' + page);
    }

    public getSinglePost(id) {
        return this.http.get(Base.url + '/api/news/' + id + '/votedetails');
    }

    public getPostVotes(id) {
        return this.http.get(Base.url + '/api/news/' + id + '/vote');
    }

    doVoting(id, voteType) {
        if (voteType === 'Like') {
            return this.http.post(Base.url + '/api/comments/' + id + '/likeunlike', {});
        } else {
            return this.http.post(Base.url + '/api/news/' + id + '/vote', {voteCategory: voteType});
        }
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

    likeComment(id, liked) {
        if (liked) {
            return this.http.delete(Base.url + '/api/comments/' + id + '/likeunlike', {});
        } else {
            return this.http.post(Base.url + '/api/comments/' + id + '/likeunlike', {});
        }
    }

    reportComment(data) {
        return this.http.put(Base.url + '/api/comments/' + data._id + '/report', data);
    }

    getLikesCount(id) {
        return this.http.get(Base.url + '/api/comments/' + id + '/likeunlike');
    }

    checkAuth() {
        return this.auth.loggedIn() ? 'user/voted/' : '';
    }

    updateViewCount(post) {
        const token = localStorage.getItem('token');
        let user: any;
        if (token) {

            user = jwtDecode(localStorage.getItem('token'));

        } else {
            user = {userId: this.cookie.get('uniqueUserId')};
        }
        return this.http.post(Base.url + '/api/news/' + post._id + '/views', {uniqueId: user.userId});
    }

    getVoteDetails(post_id) {
        return this.http.get(Base.url + '/api/news/' + post_id + '/votedetails');
    }

    getPostsByVoteType(category, vote, type = 'New') {
        if (vote !== 'All') {
            return this.http.get(`${Base.url}/api/news/${this.checkAuth()}category/${category}/vote/${vote}?filter=${type}&pagesize=30&page=1`);
        } else {
            return this.http.get(`${Base.url}/api/news/${this.checkAuth()}category/${category}?filter=${type}&pagesize=30&page=1`);
        }
    }
}
