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
import { LanguageService } from 'src/app/services/language.service';
import { firstValueFrom, take } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  categories!: TaskCategory[];
  currentUser!: User;
  openDrawer!: boolean;
  newComment!: string;
  selectedTask?: Task;
  users!: User[];
  tasks!: Task[];
  selectedTaskComments!: Comment[];
  task?: Task;

  constructor(
    private readonly dialog: MatDialog,
    private readonly categoryService: CategoryService,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private auth: Auth,
    public readonly languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.newComment = "";
    this.openDrawer = false;
    this.selectedTaskComments = [];

    this.categoryService.categories.subscribe((categories) => {
      this.categories = categories;
    });
    this.taskService.task.subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.userService.getUsers().then((users) => {
      this.users = users;
    });
    this.userService
      .getUserProfile(this.auth.currentUser?.uid ?? "")
      .then((user) => {
        this.currentUser = user ?? this.currentUser;
      });

    const navigationState = history.state;
    if (navigationState && navigationState['task']) {
      if(this.tasks.filter((t) => t.id === navigationState['task'].id).length > 0) {
        this.selectedTask = navigationState['task'];
      }
    }
  }

  selectTask = (task: Task) => {
    this.selectedTask = task;
  };

  closeDrawer = () => {
    this.selectedTask = undefined;
  };

  openDialog = (task: Task | undefined) => {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: "500px",
      data: {
        task: task,
        users: this.users,
        currentUser: this.currentUser,
        categories: this.categories,
      },
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
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
        title: this.languageService.translate("home.deleteTask"),
        message: this.languageService.translate("home.confirmDelete"),
      },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.taskService.deleteTask(task?.id ?? "");
      }
    });
  };

  editTask = (task: Task) => {
    this.openDialog(task);
  };

  addComment = () => {
    try {
      if (this.selectedTask && this.newComment) {
        const newComment = {
          authorId: this.currentUser.id,
          authorName: this.currentUser.nickname,
          content: this.newComment,
          createdAt: new Date(),
          taskId: this.selectedTask?.id ?? "",
        };
        this.selectedTaskComments = [
          ...this.selectedTaskComments,
          newComment as Comment,
        ];
        this.taskService.addComment(newComment as Comment);
        this.newComment = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  deleteComment = (commentId: string) => {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.languageService.translate("home.deleteComment"),
        message: this.languageService.translate("home.confirmDeleteComment"),
      },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.taskService.deleteComment(commentId);
        this.selectedTaskComments = this.selectedTaskComments.filter(
          (comment) => comment.id !== commentId
        );
      }
    });
  };

  clearTaskDetails(): void {
    history.replaceState({}, "", location.pathname);
    this.selectedTask = undefined;
  }

  formatDate(date: Date): string {
    var language = this.languageService.getLanguage();
    if (language === "kr") {
      language = "ko";
    }
    return new Intl.DateTimeFormat(language, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  }
}
