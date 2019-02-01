import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

// Environment
import { environment } from '../environments/environment';
import { algoliaConfig, firebaseConfig } from '../environments/api';

// Ng-Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { CreateIdeaComponent } from './create-idea/create-idea.component';
import { UserAuthGuard} from "./userauth.guard";
import { VotingIdeasComponent } from './voting-ideas/voting-ideas.component';
import { IdeaDetailsComponent } from './idea-details/idea-details.component';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { IdeaService } from './services/idea.service';
import { UserManagementComponent } from "./user-management/user-management.component";
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagService } from './services/tag.service';
import { CommentService } from './services/comment.service';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { CommentDetailsComponent } from './comment-details/comment-details.component';
import { MyIdeasComponent } from './my-ideas/my-ideas.component';
import { IdeaComponent } from './idea/idea.component';
import { ProfileComponent } from './profile/profile.component';
import { AddingReferenceIdeaComponent } from './adding-reference-idea/adding-reference-idea.component';
import { ManagerAuthGuard } from './managerauth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchService } from "./services/search.service";
import { SearchIdeasComponent } from './search-ideas/search-ideas.component';
import { UploadService } from './services/upload.service';
import { SplitAndGetLastPipe } from './pipes/split-and-get-last.pipe';
import { TextFormattingPipe } from "./pipes/text-formatting.pipe";

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    SignupComponent,
    DashboardComponent,
    LoginComponent,
    RecoverPasswordComponent,
    CreateIdeaComponent,
    VotingIdeasComponent,
    IdeaDetailsComponent,
    UserManagementComponent,
    CreateCommentComponent,
    CommentDetailsComponent,
    MyIdeasComponent,
    IdeaComponent,
    ProfileComponent,
    AddingReferenceIdeaComponent,
    NotFoundComponent,
    SearchIdeasComponent,
    SplitAndGetLastPipe,
    TextFormattingPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    RouterModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserAuthGuard,
    ManagerAuthGuard,
    UserService,
    AuthService,
    AngularFireAuth,
    AngularFireDatabase,
    IdeaService,
    CommentService,
    TagService,
    SearchService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
