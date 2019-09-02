import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {HomeComponent} from './pages/home/home.component';
import {SinglePostComponent} from './pages/single-post/single-post.component';
import {CoreModule} from '../../core/core.module';
import {CommerceComponent} from './pages/commerce/commerce.component';
import {DealsComponent} from './pages/deals/deals.component';
import {FeedbackComponent} from './pages/feedback/feedback.component';
import {PicturesComponent} from './pages/pictures/pictures.component';
import {VideoComponent} from './pages/video/video.component';
import {LoginComponent} from './components/login/login.component';
import {DirectivesComponent} from '../../shared/directives/directives.component';
import {RegisterComponent} from './components/register/register.component';
import {SubscribeComponent} from './pages/posts/subscribe/subscribe.component';
import {AddPostComponent} from './pages/posts/add-post/add-post.component';
import {PostsHomeComponent} from './pages/posts/posts-home/posts-home.component';
import {FaceLoginComponent} from './components/face-login/face-login.component';
import {RoadComponent} from './pages/road/road.component';
import {TravelComponent} from './pages/travel/travel.component';
import {AboutComponent} from './pages/about/about.component';
import {AdminProfileComponent} from './components/admin/admin-profile/admin-profile.component';
import {EditInfoModalComponent} from './components/libs/edit-info-modal/edit-info-modal.component';
import {NotificationsBoxComponent} from '../../core/notifications-box/notifications-box.component';
import {ConfirmationDialogComponent} from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {HobbyistComponent} from './pages/hobbyist/hobbyist.component';
import {ScienceComponent} from './pages/science/science.component';
import {EnvironmentComponent} from './pages/environment/environment.component';
import {PublicComponent} from './pages/public/public.component';
import {PolicyComponent} from './pages/policy/policy.component';
import {TermsComponent} from './pages/terms/terms.component';
import {FbShareComponent} from './components/fb-share/fb-share.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {AccountActivationComponent} from './components/account-activation/account-activation.component';
import {DropzoneModule} from 'ngx-dropzone-wrapper';

@NgModule({
    declarations: [
        HomeComponent,
        SinglePostComponent,
        CommerceComponent,
        DealsComponent,
        FeedbackComponent,
        PicturesComponent,
        VideoComponent,
        LoginComponent,
        DirectivesComponent,
        RegisterComponent,
        SubscribeComponent,
        AddPostComponent,
        PostsHomeComponent,
        FaceLoginComponent,
        RoadComponent,
        TravelComponent,
        AboutComponent,
        AdminProfileComponent,
        EditInfoModalComponent,
        NotificationsBoxComponent,
        ConfirmationDialogComponent,
        HobbyistComponent,
        ScienceComponent,
        EnvironmentComponent,
        PublicComponent,
        PolicyComponent,
        TermsComponent,
        FbShareComponent,
        ForgotPasswordComponent,
        AccountActivationComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        CoreModule,
        DropzoneModule
    ]
})
export class HomeModule {
}
