import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent},
  { path: "dashboard", component: DashboardComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
