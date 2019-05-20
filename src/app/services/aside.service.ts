import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Base from '../configs/config';

@Injectable({
    providedIn: 'root'
})
export class AsideService {

    constructor(private http: HttpClient) {
    }

    public getLasted() {
        return this.http.get(Base.url + '/api/news?pagesize=100&page=1');
    }
}
