import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminSidebarComponent} from './admin-sidebar/admin-sidebar.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwlCarouselComponent} from './owl-carousel/owl-carousel.component';
import {StatusBarComponent} from './status-bar/status-bar.component';
import {StoryOptionsComponent} from './story-options/story-options.component';
import {ShareButtonsModule} from '@ngx-share/buttons';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollToModule} from 'ng2-scroll-to';
import {PostsModule} from '../modules/home/pages/posts/posts.module';
import {SocialLoginModule} from 'angularx-social-login';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AsideComponent} from './aside/aside.component';
import {SidebarComponent} from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        AdminSidebarComponent,
        HeaderComponent,
        FooterComponent,
        OwlCarouselComponent,
        StatusBarComponent,
        StoryOptionsComponent,
        AsideComponent,
        SidebarComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ShareButtonsModule.withConfig({
            debug: true
        }),
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        ScrollToModule.forRoot(),
        PostsModule,
        SocialLoginModule,
        CarouselModule,
        FontAwesomeModule,
        SharedModule
    ],
    exports: [
        AdminSidebarComponent,
        HeaderComponent,
        FooterComponent,
        OwlCarouselComponent,
        StatusBarComponent,
        StoryOptionsComponent,
        AsideComponent,
        SidebarComponent,
    ]
})
export class CoreModule {
}
