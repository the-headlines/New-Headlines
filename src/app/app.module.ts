import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AsideComponent} from './core/aside/aside.component';
import {HeaderComponent} from './core/header/header.component';
import {HomeComponent} from './modules/home/pages/home/home.component';
import {FooterComponent} from './core/footer/footer.component';
import {CommerceComponent} from './modules/home/pages/commerce/commerce.component';
import {DealsComponent} from './modules/home/pages/deals/deals.component';
import {FeedbackComponent} from './modules/home/pages/feedback/feedback.component';
import {PicturesComponent} from './modules/home/pages/pictures/pictures.component';
import {VideoComponent} from './modules/home/pages/video/video.component';
import {LoginComponent} from './modules/home/components/login/login.component';
import {DirectivesComponent} from './shared/directives/directives.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RegisterComponent} from './modules/home/components/register/register.component';
import {ScrollToModule} from 'ng2-scroll-to';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {PostsModule} from './modules/home/pages/posts/posts.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SocialLoginModule, AuthServiceConfig} from 'angularx-social-login';
import {FacebookLoginProvider} from 'angularx-social-login';
import {
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatTreeModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule, MatDialogRef, MatCheckboxModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SinglePostComponent} from './modules/home/pages/single-post/single-post.component';
import {SidebarComponent} from './core/sidebar/sidebar.component';
import {SubscribeComponent} from './modules/home/pages/posts/subscribe/subscribe.component';
import {AddPostComponent} from './modules/home/pages/posts/add-post/add-post.component';
import {PostsHomeComponent} from './modules/home/pages/posts/posts-home/posts-home.component';
import {FaceLoginComponent} from './modules/home/components/face-login/face-login.component';
import {OwlCarouselComponent} from './core/owl-carousel/owl-carousel.component';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {CookieService} from 'ngx-cookie-service';
import {RoadComponent} from './modules/home/pages/road/road.component';
import {ShareButtonsModule} from '@ngx-share/buttons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TravelComponent} from './modules/home/pages/travel/travel.component';
import {AboutComponent} from './modules/home/pages/about/about.component';
import {ShareButtonModule} from '@ngx-share/button';
import {CKEditorModule} from 'ng2-ckeditor';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {AdminProfileComponent} from './modules/home/components/admin/admin-profile/admin-profile.component';
import {ToastrModule} from 'ngx-toastr';
import {RequestInterceptor} from './shared/helpers/http.interceptor';
import {EditInfoModalComponent} from './modules/home/components/libs/edit-info-modal/edit-info-modal.component';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {StatusBarComponent} from './core/status-bar/status-bar.component';
import {NotificationsBoxComponent} from './core/notifications-box/notifications-box.component';
import {StripHtmlTagsPipe} from './shared/pipes/strip-html-tags.pipe';
import {PrimeTemplate} from 'primeng/shared';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from './services/auth.service';
import {JwtModule} from '@auth0/angular-jwt';
import {SearchNewsPipe} from './shared/pipes/search-news.pipe';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {DataTableModule} from 'primeng/primeng';
import {StoryOptionsComponent} from './core/story-options/story-options.component';
import {GetPostDateFormattedPipe} from './shared/pipes/get-post-date-formatted.pipe';
import {GetUrlBasePipe} from './shared/pipes/get-url-base.pipe';
import {ConfirmationDialogComponent} from './shared/components/confirmation-dialog/confirmation-dialog.component';
import {ReportComponentComponent} from './modules/home/components/report-component/report-component.component';
import {MatRadioModule} from '@angular/material/radio';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {GenerateSaveNonAuthUserIdPipe} from './shared/pipes/generate-save-non-auth-user-id.pipe';
import {HobbyistComponent} from './modules/home/pages/hobbyist/hobbyist.component';
import { ScienceComponent } from './modules/home/pages/science/science.component';
import { PublicComponent } from './modules/home/pages/public/public.component';
import { EnvironmentComponent } from './modules/home/pages/environment/environment.component';
import { PolicyComponent } from './modules/home/pages/policy/policy.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: 'https://httpbin.org/post',
    maxFilesize: 50,
    acceptedFiles: 'image/*'
};

const config = new AuthServiceConfig([
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('2299392023457446')
    },
]);

export function provideConfig() {
    return config;
}


// Token getter for JWT module
export function tokenGetter() {
    const token = localStorage.getItem('token') || '';
    return token ? token : '';
}

@NgModule({
    declarations: [
        AppComponent,
        AsideComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent,
        CommerceComponent,
        DealsComponent,
        FeedbackComponent,
        PicturesComponent,
        VideoComponent,
        LoginComponent,
        DirectivesComponent,
        RegisterComponent,
        SinglePostComponent,
        SidebarComponent,
        SubscribeComponent,
        AddPostComponent,
        PostsHomeComponent,
        FaceLoginComponent,
        OwlCarouselComponent,
        RoadComponent,
        TravelComponent,
        AboutComponent,
        AdminProfileComponent,
        EditInfoModalComponent,
        StatusBarComponent,
        NotificationsBoxComponent,
        StripHtmlTagsPipe,
        SearchNewsPipe,
        StoryOptionsComponent,
        GetPostDateFormattedPipe,
        GetUrlBasePipe,
        ConfirmationDialogComponent,
        ReportComponentComponent,
        GenerateSaveNonAuthUserIdPipe,
        HobbyistComponent,
        ScienceComponent,
        PublicComponent,
        EnvironmentComponent,
        PolicyComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatListModule,
        MatRadioModule,
        MatToolbarModule,
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        MatTreeModule,
        MatIconModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSelectModule,
        ScrollToModule.forRoot(),
        PostsModule,
        SocialLoginModule,
        FlexLayoutModule,
        CarouselModule,
        FontAwesomeModule,
        MatTooltipModule,
        CKEditorModule,
        MatTabsModule,
        MatMenuModule,
        MatDialogModule,
        MatSlideToggleModule,
        InfiniteScrollModule,
        DropzoneModule,
        ShareButtonModule,
        DataTableModule,
        ToastrModule.forRoot(),
        ShareButtonsModule.withConfig({
            debug: true
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:3000'],
                blacklistedRoutes: ['localhost:3000/auth/']
            }
        }),
        FilterPipeModule
    ],
    providers: [{
        provide: AuthServiceConfig,
        useFactory: provideConfig
    }, CookieService, JwtHelperService, AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
        {provide: MatDialogRef, useValue: {}},
        SearchNewsPipe,
        StripHtmlTagsPipe,
        GenerateSaveNonAuthUserIdPipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent],
    entryComponents: [LoginComponent, RegisterComponent, EditInfoModalComponent, ConfirmationDialogComponent, ReportComponentComponent],
})

export class AppModule {
    constructor() {
        library.add(faCoffee);
    }
}
