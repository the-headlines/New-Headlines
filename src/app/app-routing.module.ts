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

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'road', component: RoadComponent},
    {path: 'commerce', component: CommerceComponent},
    {path: 'deals', component: DealsComponent},
    {path: 'feedback', component: FeedbackComponent},
    {path: 'pictures', component: PicturesComponent},
    {path: 'video', component: VideoComponent},
    {path: 'post/:id', component: SinglePostComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],

    exports: [RouterModule]
})

export class AppRoutingModule {

}
