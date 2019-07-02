import {Component, OnInit} from '@angular/core';
import {AsideService} from '../../services/aside.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
    show = 5;

    // MatPaginator Inputs
    length = 10;
    pageSize = 5;
    pageSizeOptions: number[] = [1, 2, 3, 4, 5];

    // MatPaginator Output
    pageEvent: PageEvent;

    datasource = [];
    lastet: any = [];

    constructor(private  aside: AsideService, private router: Router) {
        for (let i = 0; i < 20; i++) {
            let dummyObject = this.lastet.singleLastet;
            this.datasource.push(dummyObject);
        }
        this.lastet = this.datasource.slice(0, this.pageSize);
    }

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

    onPageChanged(e) {
        let firstCut = e.pageIndex * e.pageSize;
        let secondCut = firstCut + e.pageSize;
        this.lastet = this.datasource.slice(firstCut, secondCut);
    }

    ngOnInit() {
        this.getLasted();
    }

    getSingle(id) {
        this.router.navigate(['/posts', id]);
    }

    getLasted() {
        this.aside.getLasted().subscribe((data) => {
            if (!data) {
                return false;
            } else if (!data['status'] && data['status'] == 0) {
                alert('No data');
                return false;
            } else {
                this.lastet = data;
                // return console.log('sss', this.lastet);
            }
        });
    }

    strip_tags(str) {
        return str.replace(/<[^>]*>/g, '');
    }
}
