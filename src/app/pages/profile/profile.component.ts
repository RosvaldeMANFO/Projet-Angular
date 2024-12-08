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
  user: Partial<User> = {}; // Holds the user data
  currentUserId: string = ''; // Current logged-in user's ID
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
    const uidFromRoute = this.route.snapshot.paramMap.get('uid'); // Get UID from route
    onAuthStateChanged(this.auth, async (currentUser) => {
      if (currentUser) {
        this.currentUserId = currentUser.uid; // Get current user UID
        if (uidFromRoute) {
          // If UID is in the route, load that user's profile
          await this.loadUserProfile(uidFromRoute);
        } else {
          // If no UID in the route, load the current logged-in user's profile
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
        uid: uid, // Add UID to the user object for comparison in the template
      };
    }
  }

  // Check if the profile is for the current user
  isCurrentUserProfile(): boolean {
    return this.user.uid === this.currentUserId;
  }
}
