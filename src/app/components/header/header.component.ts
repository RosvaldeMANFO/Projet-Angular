import { Component, OnInit } from '@angular/core';
import { Auth, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  userRole: string | null = null;

  constructor(
    private auth: Auth,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged(async (user) => {
      this.user = user;

      if (user) {
        const profile = await this.userService.getUserProfile(user.uid);
        this.userRole = profile?.userRole || null;
      }
    });
  }

  signOutUser() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']);
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  }

  openProfile() {
    this.router.navigate(['/profile']);
  }

  openDashboard() {
    this.router.navigate(['/dashboard']);
  }

  openMembers() {
    this.router.navigate(['/members']);
  }
}
