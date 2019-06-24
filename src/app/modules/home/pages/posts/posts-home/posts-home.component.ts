import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-posts-home',
    templateUrl: './posts-home.component.html',
    styleUrls: ['./posts-home.component.scss']
})
export class PostsHomeComponent implements OnInit {
    data: any = [];
    delRow;

    constructor() {
    }

    ngOnInit(): void {
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

    addNew() {
        this.data.push({
            date: '',
            link: '',
            section: '',
            edit_post: ''
        });
        this.data[this.data.length - 1].isEditable = true;
    }

    delete(row) {
        console.log(row);
        this.delRow = this.data.indexOf(row);
        this.data.splice(this.delRow, 1);
        console.log(this.data);

    }

    getData() {
        this.data = [
            {date: new Date(), link: 'https://www.bbc.co.uk/sport/live/football/47034381', section: 'General news'},
            {date: new Date(), link: 'https://www.bbc.co.uk/sport/live/football/47034381', section: 'General news'},
            {date: new Date(), link: 'https://www.bbc.co.uk/sport/live/football/47034381', section: 'General news'},
            {date: new Date(), link: 'https://www.bbc.co.uk/sport/live/football/47034381', section: 'General news'},
        ];
        this.data.map(row => {
            row.isEditable = false;
        });
    }
}
