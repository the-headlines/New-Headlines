import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostsComponent} from './posts/posts.component';
import {AddPostComponent} from './add-post/add-post.component';
import {PostsHomeComponent} from './posts-home/posts-home.component';
import {SubscribeComponent} from './subscribe/subscribe.component';
import {SinglePostComponent} from '../single-post/single-post.component';

const routes: Routes = [
    {
        path: 'posts',
        component: PostsComponent,
        children: [
            {
                path: 'add-post',
                component: AddPostComponent
            },
            {
                path: 'subscribe',
                component: SubscribeComponent
            },
            {
                path: 'home-posts',
                component: PostsHomeComponent
            },
            // {
            //     path: ':id',
            //     component: SinglePostComponent
            // }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PostsRoutingModule {
}
