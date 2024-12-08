import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../model/user.model';
import { onAuthStateChanged } from '@angular/fire/auth';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: Partial<User> = {};
  currentUserId: string = '';
  tasks = [
    { title: 'Design Task Management App', description: 'Create mockups and prototype', completed: true },
    { title: 'Implement Authentication', description: 'Set up Firebase Auth', completed: false },
    { title: 'Create Profile Page', description: 'Build using Angular Material', completed: false },
    { title: 'Test Application', description: 'Perform end-to-end testing', completed: true },
  ];

  constructor(
    private auth: Auth,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const uidFromRoute = this.route.snapshot.paramMap.get('uid');
    onAuthStateChanged(this.auth, async (currentUser) => {
      if (currentUser) {
        this.currentUserId = currentUser.uid;
        if (uidFromRoute) {
          await this.loadUserProfile(uidFromRoute);
        } else {
          await this.loadUserProfile(currentUser.uid);
        }
      }
    });
  }

  private async loadUserProfile(uid: string): Promise<void> {
    const userProfile = await this.userService.getUserProfile(uid);
    if (userProfile) {
      this.user = {
        name: userProfile.name || 'N/A',
        nickname: userProfile.nickname || 'N/A',
        email: userProfile.email,
        bio: userProfile.bio || 'N/A',
        createdAt: userProfile.createdAt instanceof Timestamp
          ? userProfile.createdAt.toDate()
          : undefined,
        role: userProfile.role || 'User',
        id: uid,
      };
    }
  }
  isCurrentUserProfile(): boolean {
    return this.user.id === this.currentUserId;
  }
}
