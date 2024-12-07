import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from "@angular/material/sidenav";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/env.dev';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { TaskStatsComponent } from "./pages/dashboard/task-stats/task-stats.component";
import { CommentStatsComponent } from "./pages/dashboard/comment-stats/comment-stats.component";
import { OverviewStatsComponent } from "./pages/dashboard/overview-stats/overview-stats.component";
import { NgChartsModule } from 'ng2-charts';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditTaskDialogComponent } from './components/edit-task-dialog/edit-task-dialog.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { ToggleDrawerDirective } from './directives/toggle-drawer.directive';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TwoDigitPipe } from './pipes/two-digit.pipe';
import { ApplyColorDirective } from './directives/apply-color.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    TaskStatsComponent,
    CommentStatsComponent,
    OverviewStatsComponent,
    ProfileComponent,
    EditTaskDialogComponent,
    TaskCardComponent,
    ToggleDrawerDirective,
    SearchBarComponent,
    TwoDigitPipe,
    ApplyColorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    NgChartsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
