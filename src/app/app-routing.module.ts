import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components for routes
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { CreateIdeaComponent } from "./create-idea/create-idea.component";
import { UserAuthGuard } from "./userauth.guard";
import { IdeaDetailsComponent } from './idea-details/idea-details.component';
import { UserManagementComponent } from "./user-management/user-management.component";
import { MyIdeasComponent } from './my-ideas/my-ideas.component';
import { ProfileComponent } from './profile/profile.component';
import { ManagerAuthGuard} from "./managerauth.guard";
import {NotFoundComponent} from "./not-found/not-found.component";
import {SearchIdeasComponent} from "./search-ideas/search-ideas.component";

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [UserAuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [UserAuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'password', component: RecoverPasswordComponent },
  { path: 'create', component: CreateIdeaComponent, canActivate: [UserAuthGuard] },
  { path: 'details/:id', component: IdeaDetailsComponent, canActivate: [UserAuthGuard]},
  { path: 'management', component: UserManagementComponent, canActivate: [ManagerAuthGuard]},
  { path: 'my-ideas', component: MyIdeasComponent, canActivate: [UserAuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [UserAuthGuard]},
  { path: 'create-reference/:ref/:id', component: CreateIdeaComponent, canActivate: [UserAuthGuard]},
  { path: 'details-parent/:ref/:id', component: IdeaDetailsComponent, canActivate: [UserAuthGuard]},
  { path: 'edit-idea/:edit/:id', component: CreateIdeaComponent, canActivate: [UserAuthGuard]},
  { path: 'search/:term', component: SearchIdeasComponent },
  { path: 'search/:tag/:term', component: SearchIdeasComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
