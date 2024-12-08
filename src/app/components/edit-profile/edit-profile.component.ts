import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
})

export class EditProfileComponent implements OnInit {
  nickname: string = '';
  bio: string = '';
  errorMessage: string = '';

  constructor(private auth: Auth, private userService: UserService) {}

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user) {
      const profile = await this.userService.getUserProfile(user.uid);
      this.nickname = profile?.nickname || '';
      this.bio = profile?.bio || '';
    }
  }

  async saveProfile() {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await this.userService.createOrUpdateUserProfile(user.uid, {
          nickname: this.nickname,
          bio: this.bio,
        });
        alert('Profile updated successfully!');
      } catch (error) {
        this.errorMessage = 'Failed to save profile.';
        console.error(error);
      }
    }
  }
}
