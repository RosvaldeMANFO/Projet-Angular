import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
})

export class MembersComponent implements OnInit {
  members: User[] = [];
  currentUserRole: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: Auth
  ) {}

  async ngOnInit(): Promise<void> {
    await this.checkCurrentUserRole();
    this.loadMembers();
  }

  async checkCurrentUserRole(): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      const profile = await this.userService.getUserProfile(user.uid);
      this.currentUserRole = profile?.userRole || '';
    }
  }

  async loadMembers(): Promise<void> {
    try {
      const users = await this.userService.getUsers(); 
      this.members = users;
    } catch (error) {
      console.error('Error loading members', error);
    }
  }

  async updateUserRole(userId: string, newRole: string): Promise<void> {
    try {
      await this.userService.updateUserRole(userId, newRole);
      alert(`User role updated to ${newRole}`);
      this.loadMembers();
    } catch (error) {
      console.error('Error updating user role', error);
    }
  }
  

  goToProfile(id: string): void {
    this.router.navigate([`/profile/${id}`]);
  }
}
