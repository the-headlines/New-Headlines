import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-posts-home',
    templateUrl: './posts-home.component.html',
    styleUrls: ['./posts-home.component.scss']
})
export class PostsHomeComponent implements OnInit {
    displayedColumns: string[] = ['date', 'link', 'section', 'edit', 'actions'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    data: any = [];

    constructor() {
    }

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
    }
}

export interface PeriodicElement {
    date: string;
    link: string;
    section: number;
    edit: string;
    actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {date: '1', link: 'Hydrogen', section: 1.0079, edit: 'H', actions: ''},
];