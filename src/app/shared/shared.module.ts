import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatReusableTableComponent} from './components/mat-reusable-table/mat-reusable-table.component';
import {GetTableDataSourcePipe} from './pipes/get-table-data-source.pipe';
import {GetUrlBasePipe} from './pipes/get-url-base.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollToModule} from 'ng2-scroll-to';
import {PostsModule} from '../modules/home/pages/posts/posts.module';
import {SocialLoginModule} from 'angularx-social-login';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SearchNewsPipe} from './pipes/search-news.pipe';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {StripHtmlTagsPipe} from './pipes/strip-html-tags.pipe';
import {GetPostDateFormattedPipe} from './pipes/get-post-date-formatted.pipe';
import {ReportComponentComponent} from '../modules/home/components/report-component/report-component.component';
import {GenerateSaveNonAuthUserIdPipe} from './pipes/generate-save-non-auth-user-id.pipe';
import {CountPostScorePipe} from './pipes/count-post-score.pipe';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {MaterialModule} from './material.module';

@NgModule({
    declarations: [
        MatReusableTableComponent,
        GetTableDataSourcePipe,
        GetUrlBasePipe,
        SearchNewsPipe,
        StripHtmlTagsPipe,
        GetPostDateFormattedPipe,
        ReportComponentComponent,
        GenerateSaveNonAuthUserIdPipe,
        CountPostScorePipe,
        CapitalizePipe,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        DropzoneModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatReusableTableComponent,
        GetTableDataSourcePipe,
        GetUrlBasePipe,
        FlexLayoutModule,
        ScrollToModule,
        PostsModule,
        SocialLoginModule,
        CarouselModule,
        FontAwesomeModule,
        SearchNewsPipe,
        InfiniteScrollModule,
        StripHtmlTagsPipe,
        GetPostDateFormattedPipe,
        ReportComponentComponent,
        GenerateSaveNonAuthUserIdPipe,
        CountPostScorePipe,
        CapitalizePipe,
        DropzoneModule,
    ]
})
export class SharedModule {
}
