import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})

export class SubjectService {

    public userData = new Subject<any>();
    public searchData = new Subject<string>();
    public dialogState = new Subject<string>();
    public postCategory = new Subject<string>();

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
    getUserData(): Observable<any> {
        return this.userData.asObservable();
    }

    setSearch(value) {
        this.searchData.next(value);
    }

    getSearch(): Observable<any> {
        return this.searchData.asObservable();
    }

    setDialogState(value) {
        this.dialogState.next(value);
    }

    getDialogState(): Observable<any> {
        return this.dialogState.asObservable();
    }

    setPostCategory(value) {
        this.postCategory.next(value);
    }

    getPostCategory(): Observable<any> {
        return this.postCategory.asObservable();
    }

}
