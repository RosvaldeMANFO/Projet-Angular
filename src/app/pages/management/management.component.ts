import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { TaskService } from 'src/app/services/task.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
})
export class ManagementComponent {
  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  printOK() {
    console.log('OK');
  }

  deleteAllTasks() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Delete All Tasks",
        message: "Are you sure you want to delete all the tasks?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteAllTasks();
      }
    });
  }

  addTasksToFirebase() {
    this.taskService.addMockTasks();
  }

  printAllCategories() {
    this.categoryService.categories.subscribe(categories => {
      console.log('Categories:', categories);
    });
  }

  printAllTasks() {
    console.log('Tasks:', this.taskService.cachedTask);
  }

  async printAllUsers() {
    try {
      const users = await this.userService.getUsers();
      console.log('Users:', users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

}
