import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Category} from '../add-post/add-post.component';
import {HomeService} from '../../../../../services/home.service';
import * as moment from 'moment';
import {PostsService} from '../../../../../services/posts.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAIN_SECTIONS} from '../../../../../shared/constants/main';

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
    postForm: FormGroup;

    categories = MAIN_SECTIONS;

    constructor(
        private home: HomeService,
        private postsService: PostsService,
        public router: Router,
        private fb: FormBuilder,
        private matDialog: MatDialog,
        private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        private toastr: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;

        this.postForm = this.fb.group({
            description: [null],
            link: [null],
            category: [null, Validators.required],
            video: [false]
        });

        this.postForm.patchValue({category: 0});
    }

    selectCategory(c) {
        this.home.getPostsByCategory(c).subscribe((dt: any) => {
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
        this.dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
            data: {
                width: '700px',
                height: '400px'
            }
        });


        this.dialogRef.afterClosed().subscribe(c => {
            if (c) {
                this.postsService.remove(id).subscribe((dt: any) => {
                    // this.posts = dt;
                    // this.filteredPosts = new MatTableDataSource(dt.news);

                    this.selectCategory(this.postForm.value.category);
                    this.toastr.success('The post has been removed successfully');
                });
            }

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
