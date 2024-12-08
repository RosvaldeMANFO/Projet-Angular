import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
})

export class MembersComponent implements OnInit {
  members: User[] = []; 

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  async loadMembers(): Promise<void> {
    try {
      const users = await this.userService.getUsers(); 
      this.members = users;
    } catch (error) {
      console.error('Error loading members', error);
    }
  }

  goToProfile(uid: string): void {
    this.router.navigate([`/profile/${uid}`]); 
  }
}
