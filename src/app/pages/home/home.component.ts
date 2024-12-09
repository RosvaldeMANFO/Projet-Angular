import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from 'src/app/components/edit-task-dialog/edit-task-dialog.component';
import { Task, TaskCategory } from 'src/app/model/task.model';
import { Comment } from 'src/app/model/comment.model';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
import { Auth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly dialog: MatDialog,
    private readonly categoryService: CategoryService,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private auth: Auth,
  ) { }

  ngOnInit(): void {
    this.categoryService.categories.subscribe(categories => {
      this.categories = categories;
    });
    this.taskService.task.subscribe(tasks => {
      console.log(tasks);
      this.fakeTasks = tasks;
    });
    this.userService.getUsers().then(users => {
      this.users = users;
    });
    this.userService.getUserProfile(this.auth.currentUser?.uid ?? '').then(user => {
      this.currentUser = user ?? this.currentUser;
    });
  }

  categories: TaskCategory[] = [];
  currentUser = { id: "1", name: "John Doe" };
  openDrawer = false;
  newComment = "";
  selectedTask?: Task;
  selectedTaskComments: Comment[] = [];

  fakeTasks: Task[] = [];
  users: User[] = [];

  selectTask = (task: Task) => {
    this.selectedTask = task;
  };

  closeDrawer = () => {
    this.selectedTask = undefined;
  };

  openDialog = (task: Task | undefined) => {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '500px',
      data: {
        task: task,
        users: this.users,
        currentUser: this.currentUser,
        categories: this.categories,
      },
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      console.log(result);
      if (result) {
        this.taskService.setTask(result);
      }
    });
  };

  searchTasks = (term: string | undefined) => {
    this.taskService.searchTask(term);
  };

  filterTasks = (state: string) => {
    this.taskService.filterByState(state);
  };

  addNewTask = () => {
    this.openDialog(undefined);
  };

  deleteTask = (task: Task | undefined) => {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Delete Task",
        message: "Are you sure you want to delete this task?",
      },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.taskService.deleteTask(task?.id ?? '');
      }
    });
  };

  editTask = (task: Task) => {
    this.openDialog(task);
  };

  addComment = () => {
    console.log(this.newComment);
    this.newComment = "";
  };
}
