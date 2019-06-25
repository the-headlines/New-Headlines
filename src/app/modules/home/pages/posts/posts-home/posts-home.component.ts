import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-posts-home',
    templateUrl: './posts-home.component.html',
    styleUrls: ['./posts-home.component.scss']
})
export class PostsHomeComponent implements OnInit {
    displayedColumns: string[] = ['date', 'link', 'section', 'edit', 'save'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;


    data: any = [];
    delRow;

    constructor() {
    }

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    editRow(row) {
        this.data.filter(row => row.isEditable).map(r => {
            r.isEditable = false;
            return r;
        });
        row.isEditable = true;
    }

    save(row) {
        row.isEditable = false;
    }

    delete(row) {
        console.log(row);
        this.delRow = this.data.indexOf(row);
        this.data.splice(this.delRow, 1);
        console.log(this.data);
    }
}

export interface PeriodicElement {
    date: string;
    link: string;
    section: number;
    edit: string;
    save: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {date: '1', link: 'Hydrogen', section: 1.0079, edit: 'H', save: 'save'},
];