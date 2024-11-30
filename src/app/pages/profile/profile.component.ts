import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'John Doe',
    bio: 'Full-Stack Developer | Task Manager Enthusiast',
    email: 'johndoe@example.com',
    joinedDate: 'January 15, 2022',
  };

  tasks = [
    { title: 'Design Task Management App', description: 'Create mockups and prototype', completed: true },
    { title: 'Implement Authentication', description: 'Set up Firebase Auth', completed: false },
    { title: 'Create Profile Page', description: 'Build using Angular Material', completed: false },
    { title: 'Test Application', description: 'Perform end-to-end testing', completed: true },
  ];

  constructor() {}

  ngOnInit(): void {}
}
