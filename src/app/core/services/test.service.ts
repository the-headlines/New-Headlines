import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Base from '../../configs/config';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {
  }

  public testModels(data) {
    return this.http.post(Base.url + '/insert_ferry', data);
  }

  public getPosts() {
    return this.http.get(Base.url + '/all_ferry');
  }
}
