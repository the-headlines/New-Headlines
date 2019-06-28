import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './modules/home/pages/home/home.component';
import {DealsComponent} from './modules/home/pages/deals/deals.component';
import {CommerceComponent} from './modules/home/pages/commerce/commerce.component';
import {FeedbackComponent} from './modules/home/pages/feedback/feedback.component';
import {PicturesComponent} from './modules/home/pages/pictures/pictures.component';
import {VideoComponent} from './modules/home/pages/video/video.component';
import {SinglePostComponent} from './modules/home/pages/single-post/single-post.component';
import {RoadComponent} from './modules/home/pages/road/road.component';
import {TravelComponent} from './modules/home/pages/travel/travel.component';
import {AboutComponent} from './modules/home/pages/about/about.component';
import {AdminProfileComponent} from './modules/home/components/admin/admin-profile/admin-profile.component';
import {AddPostComponent} from './modules/home/pages/posts/add-post/add-post.component';
import {SubscribeComponent} from './modules/home/pages/posts/subscribe/subscribe.component';
import {PostsHomeComponent} from './modules/home/pages/posts/posts-home/posts-home.component';
import {NotificationsBoxComponent} from './core/notifications-box/notifications-box.component';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '', component: HomeComponent, data: {
            search: true
        }
    },
    {
        path: 'home', component: HomeComponent, data: {
            search: true
        }
    },
    {
        path: 'road', component: RoadComponent,
        data: {
            search: true
        }
    },
    {
        path: 'commerce', component: CommerceComponent,
        data: {
            search: true
        }
    },
    {
        path: 'deals', component: DealsComponent, data: {
            search: true
        }
    },
    {
        path: 'feedback', component: FeedbackComponent,
        data: {
            search: true
        }
    },
    {
        path: 'pictures', component: PicturesComponent, data: {
            search: true
        }
    },
    {
        path: 'video', component: VideoComponent, data: {
            search: true
        }
    },
    {
        path: 'travel', component: TravelComponent, data: {
            search: true
        }
    },
    {path: 'about', component: AboutComponent},
    {path: 'profile', component: AdminProfileComponent},
    {path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard]},
    {path: 'post/:id', component: SinglePostComponent},
    {path: 'subscribe', component: SubscribeComponent},
    {path: 'managePost', component: PostsHomeComponent, canActivate: [AuthGuard]},
    {path: 'editPost/:id', component: AddPostComponent, canActivate: [AuthGuard]},
    {path: 'notifications', component: NotificationsBoxComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
