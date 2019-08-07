import {Component, OnInit, ViewChild} from '@angular/core';
import {AsideService} from '../../services/aside.service';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material';
// import {EditInfoModalComponent} from "./modules/home/components/libs/edit-info-modal/edit-info-modal.component";
// import {FeedbackComponent} from "./modules/home/pages/feedback/feedback.component";


@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {


    constructor(private  aside: AsideService, private router: Router) {
    }

    posts: any = [];
    filteredPosts: any = [];
    defaultRecords = 3;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
        this.getLasted();
    }

    getSingle(id) {
        this.router.navigate(['/posts', id]);
    }

    getLasted() {
        this.aside.getLasted().subscribe((data: any) => {
            if (!data) {
                return false;
            } else if (!data['status'] && data['status'] == 0) {
                alert('No data');
                return false;
            } else {
                this.posts = data;
                this.filteredPosts.news = data.news.slice(0, this.defaultRecords);
                // return console.log('sss', this.lastet);
            }
        });
    }

    strip_tags(str) {
        return str ? str.replace(/<[^>]*>/g, '') : str;
    }

    handle(e) {
        this.filteredPosts.news = this.posts.news.slice(e.pageIndex * e.pageSize,
            e.pageIndex * e.pageSize + e.pageSize);
    }

    getLength(d) {
        return d ? d.length : 0;
    }
    //
    // openDialog(term): void {
    //     const dialogRef = this.dialog.open(FeedbackComponent, {
    //         width: '500px',
    //         data: {
    //             name: term
    //         }
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //     });
    // }
}
