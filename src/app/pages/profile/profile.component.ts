import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../model/user.model';
import { Task } from '../../model/task.model';
import { onAuthStateChanged } from '@angular/fire/auth';
import { Timestamp } from 'firebase/firestore';
import { LanguageService } from '../../services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: Partial<User> = {};
  currentUserId: string = '';
  tasks: Task[] = [];

  constructor(
    private auth: Auth,
    private userService: UserService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    public readonly languageService: LanguageService,
    private router: Router,
  ) { }

  ngOnInit() {
    onAuthStateChanged(this.auth, user => {
      if (user) {
        this.currentUserId = user.uid;
      }
    });
    this.route.paramMap.subscribe(async params => {
      this.currentUserId = this.auth.currentUser?.uid || '';
      const uidFromRoute = params.get('uid');
      if (uidFromRoute) {
        console.log(uidFromRoute);
        await this.loadUserProfile(uidFromRoute);
        await this.loadTasks(uidFromRoute);
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
        role: userProfile.role || 'N/A',
        twitter: userProfile.twitter || '',
        facebook: userProfile.facebook || '',
        linkedin: userProfile.linkedin || '',
        id: uid,
      };
    }
  }
  

  private async loadTasks(userId: string): Promise<void> {
    this.taskService.getTaskByUserId(userId).subscribe(async tasks => {
      this.tasks = await tasks;
    });
  }

  isCurrentUserProfile(): boolean {
    return this.user.id === this.currentUserId;
  }

  onTaskClick(task: any): void {
    this.router.navigate(['/']);
  }
}
