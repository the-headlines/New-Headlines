import {Component, OnInit, ViewChild} from '@angular/core';
import {AsideService} from '../../services/aside.service';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material';
import {SubjectService} from '../../services/subject.service';
import {MAIN_SECTIONS} from '../../shared/constants/main';
// import {EditInfoModalComponent} from "./modules/home/components/libs/edit-info-modal/edit-info-modal.component";
// import {FeedbackComponent} from "./modules/home/pages/feedback/feedback.component";


@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
    selectedSection = MAIN_SECTIONS.filter(s => s.name === 'Influence');
    sections = MAIN_SECTIONS;
    postCategory = 'Influence';

    constructor(
        private  aside: AsideService,
        public router: Router,
        private subject: SubjectService
    ) {
    }

    posts: any = [];
    filteredPosts: any = [];
    defaultRecords = 3;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {

        if (this.router.url !== '/') {

            this.selectedSection = this.sections.filter(s => s.link === this.router.url);
        }


        if (this.selectedSection && this.selectedSection.length > 0) {
            this.postCategory = this.selectedSection[0].dbName;
            this.getTopNews();
        }
    }

    getSingle(id) {
        this.router.navigate(['/posts', id]);
    }

    getTopNews() {
        this.aside.getTopNews(this.postCategory).subscribe((data: any) => {
            this.posts = data;
            this.filteredPosts.news = data.news.slice(0, this.defaultRecords);
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
