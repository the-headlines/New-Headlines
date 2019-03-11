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
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './modules/home/components/register/register.component';

import {
  MatIconModule,
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
import { SinglePostComponent } from './modules/home/pages/single-post/single-post.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ LoginComponent, RegisterComponent ]
})
export class AppModule {
}
