import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubjectService {

    public tableData = new Subject<any>();

    constructor() {
    }

    setTableData(value) {
        this.tableData.next(value);
    }

    getTableData(): Observable<any> {
        return this.tableData.asObservable();
    }
}
