import { Component, OnInit } from '@angular/core';
import { Auth, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  
  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
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
}
