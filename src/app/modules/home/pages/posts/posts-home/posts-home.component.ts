import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Categorie} from '../add-post/add-post.component';
import {HomeService} from '../../../../../services/home.service';
import * as moment from 'moment';
import {PostsService} from '../../../../../services/posts.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-posts-home',
    templateUrl: './posts-home.component.html',
    styleUrls: ['./posts-home.component.scss']
})
export class PostsHomeComponent implements OnInit {
    displayedColumns: string[] = ['extractedImage', 'extractedTitle', 'createdAt', 'actions'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    data: any = [];
    selectedValue: string;
    filteredPosts: any = [];
    posts;
    categorySelected = false;


    categories: Categorie[] = [
        {value: 'Influence', viewValue: 'Influence'},
        {value: 'StyleAndSweat', viewValue: 'Style and sweat'},
        {value: 'CameraPictures', viewValue: 'Camera Pictures'},
        {value: 'JumpStartups', viewValue: 'Jump Startups'},
        {value: 'HumanStories', viewValue: 'Human Stories'},
        {value: 'LoveDesigns', viewValue: 'Love Designs'},
        {value: 'Videos', viewValue: 'Videos'}
    ];

    constructor(
        private home: HomeService,
        private postsService: PostsService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    selectCategory(c) {
        this.home.getPostsByCategory(c.source.value).subscribe((dt: any) => {
            dt['news'].sort((a, b) => {
                return moment(b['createdAt']).unix() - moment(a['createdAt']).unix();
            });
            this.posts = dt;
            this.filteredPosts = new MatTableDataSource(dt.news);
            this.categorySelected = true;
        });
    }

    getPostDate(dt) {
        return moment(dt).format('DD/MM/YYYY');
    }

    getBackgroundUrl(url) {
        return `url(${url})`;
    }

    removePost(id) {
        this.postsService.remove(id).subscribe((dt: any) => {
            this.posts = dt;
            this.filteredPosts = new MatTableDataSource(dt.news);
        });
    }

    editPost(id) {
        this.router.navigate([`editPost/${id}/`]);
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
