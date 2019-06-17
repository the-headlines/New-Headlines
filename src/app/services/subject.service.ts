import { Injectable } from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {

  public userData = new Subject<any>();

  constructor() {
  }


  /**
   * Sets current language of the system and passes to subscribed components
   * @param value
   */
  setUserData(value) {
    this.userData.next(value);
  }

  /**
   * Gets current language of the system and returns to subscribed components
   * @returns {Observable<string>}
   */
  getUserData(): Observable<string> {
    return this.userData.asObservable();
  }



}
