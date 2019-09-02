import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {RoadComponent} from './pages/road/road.component';
import {CommerceComponent} from './pages/commerce/commerce.component';
import {DealsComponent} from './pages/deals/deals.component';
import {FeedbackComponent} from './pages/feedback/feedback.component';
import {PicturesComponent} from './pages/pictures/pictures.component';
import {TravelComponent} from './pages/travel/travel.component';
import {HobbyistComponent} from './pages/hobbyist/hobbyist.component';
import {ScienceComponent} from './pages/science/science.component';
import {EnvironmentComponent} from './pages/environment/environment.component';
import {PublicComponent} from './pages/public/public.component';
import {AboutComponent} from './pages/about/about.component';
import {PolicyComponent} from './pages/policy/policy.component';
import {AdminProfileComponent} from './components/admin/admin-profile/admin-profile.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent, data: {
            search: true
        }
    },
    {path: 'profile', component: AdminProfileComponent},
    {path: 'about', component: AboutComponent},
    {path: 'policy', component: PolicyComponent},
    {
        path: 'home', component: HomeComponent, data: {
            search: true
        }
    },
    {
        path: 'style-and-sweat', component: RoadComponent,
        data: {
            search: true
        }
    },
    {
        path: 'jump-startups', component: CommerceComponent,
        data: {
            search: true
        }
    },
    {
        path: 'love-designs', component: DealsComponent, data: {
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
        path: 'human-stories', component: TravelComponent, data: {
            search: true
        }
    },
    {
        path: 'hobbyist', component: HobbyistComponent, data: {
            search: true
        }
    },
    {
        path: 'science', component: ScienceComponent, data: {
            search: true
        }
    },
    {
        path: 'environment', component: EnvironmentComponent, data: {
            search: true
        }
    },
    {
        path: 'public', component: PublicComponent, data: {
            search: true
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
