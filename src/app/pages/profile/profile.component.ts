import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: Partial<User> = {};
  tasks = [
    { title: 'Design Task Management App', description: 'Create mockups and prototype', completed: true },
    { title: 'Implement Authentication', description: 'Set up Firebase Auth', completed: false },
    { title: 'Create Profile Page', description: 'Build using Angular Material', completed: false },
    { title: 'Test Application', description: 'Perform end-to-end testing', completed: true },
  ];

  constructor(private auth: Auth, private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    onAuthStateChanged(this.auth, async (currentUser) => {
      if (currentUser) {
        const userProfile = await this.userService.getUserProfile(currentUser.uid);
        if (userProfile) {
          this.user = {
            uid: currentUser.uid,
            name: userProfile.name || 'N/A',
            nickname: userProfile.nickname || 'N/A',
            email: userProfile.email,
            bio: userProfile.bio || 'N/A',
            createdAt: userProfile.createdAt instanceof Timestamp
              ? userProfile.createdAt.toDate() 
              : undefined,
            role: userProfile.role || 'User',
          };
        }
      }
    });
  }
}
