import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { roleGuard } from './guards/role.guard';
import { MembersComponent } from './pages/members/members.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] }, 
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] }, 
  { path: 'signup', component: SignupComponent, canActivate: [noAuthGuard] }, 
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] }, 
  { path: "dashboard", component: DashboardComponent, canActivate: [roleGuard] }, 
  { path: "edit-profile", component: EditProfileComponent, canActivate: [authGuard] }, 
  { path: 'profile/:uid', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'members', component: MembersComponent, canActivate: [authGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
