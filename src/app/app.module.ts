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
import {PipesComponent} from './shared/pipes/pipes.component';
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
    MatDialogModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SinglePostComponent} from './modules/home/pages/single-post/single-post.component';
import {SidebarComponent} from './core/sidebar/sidebar.component';
import {PostsComponent} from './modules/home/pages/posts/posts/posts.component';
import {FacebookModule} from 'ngx-facebook';
import {FaceLoginComponent} from './modules/home/components/face-login/face-login.component';
import {OwlCarouselComponent} from './core/owl-carousel/owl-carousel.component';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {CookieService} from 'ngx-cookie-service';
import {RoadComponent} from './modules/home/pages/road/road.component';

const config = new AuthServiceConfig([
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('2299392023457446')
    },
]);

export function provideConfig() {
    return config;
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
        PipesComponent,
        RegisterComponent,
        SinglePostComponent,
        PostsComponent,
        SidebarComponent,
        FaceLoginComponent,
        OwlCarouselComponent,
        RoadComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
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
        MatPaginatorModule,
        MatSelectModule,
        ScrollToModule.forRoot(),
        PostsModule,
        SocialLoginModule,
        FlexLayoutModule,
        FacebookModule.forRoot(),
        CarouselModule,
    ],
    providers: [{
        provide: AuthServiceConfig,
        useFactory: provideConfig
    },CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent],
    entryComponents: [LoginComponent, RegisterComponent],
})
export class AppModule {
}
