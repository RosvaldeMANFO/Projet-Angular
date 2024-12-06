import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from 'src/app/components/edit-task-dialog/edit-task-dialog.component';
import { Task, TaskState, TaskCategory } from 'src/app/model/task.model';
import { Comment } from 'src/app/model/comment.model';
import { fakeTaskCategories } from 'src/app/model/fake-data';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this._categoryService.categories.subscribe(categories => {
      this.categories = categories;
    });
  }

  categories: TaskCategory[] = [];
  currentUser = { id: '1', name: 'John Doe' };
  openDrawer = false;
  newComment = '';
  selectedTask?: Task;
  selectedTaskComments: Comment[] = [
    { id: '1', taskId: '1', authorId: '1', authorName: 'John Doe', content: 'Comment 1', createdAt: new Date() },
    { id: '2', taskId: '1', authorId: '2', authorName: 'Jane Doe', content: 'Comment 2', createdAt: new Date() },
    { id: '3', taskId: '1', authorId: '3', authorName: 'Alice', content: 'Comment 3', createdAt: new Date() },
    { id: '3', taskId: '1', authorId: '3', authorName: 'Alice', content: 'Comment 3', createdAt: new Date() },
    { id: '3', taskId: '1', authorId: '3', authorName: 'Alice', content: 'Comment 3', createdAt: new Date() },
  ];

  fakeTasks: Task[] = [
    { id: '1', title: 'Task 1', description: 'Description 1', state: TaskState.TODO, category: fakeTaskCategories[0], startDate: new Date(), endDate: new Date(), assigneeId: '1', assigneeName: 'John Doe', reporterId: '2', reporterName: 'Jane Doe' },
    { id: '2', title: 'Task 2', description: 'Description 2', state: TaskState.DOING, category: fakeTaskCategories[1], startDate: new Date(), endDate: new Date(), assigneeId: '2', assigneeName: 'Jane Doe', reporterId: '3', reporterName: 'Alice' },
    { id: '3', title: 'Task 3', description: 'Description 3', state: TaskState.DONE, category: fakeTaskCategories[2], startDate: new Date(), endDate: new Date(), assigneeId: '3', assigneeName: 'Alice', reporterId: '4', reporterName: 'Bob' },
    { id: '4', title: 'Task 4', description: 'Description 4', state: TaskState.TODO, category: fakeTaskCategories[3], startDate: new Date(), endDate: new Date(), assigneeId: '4', assigneeName: 'Bob', reporterId: '5', reporterName: 'Charlie' },
    { id: '5', title: 'Task 5', description: 'Description 5', state: TaskState.DOING, category: fakeTaskCategories[4], startDate: new Date(), endDate: new Date(), assigneeId: '5', assigneeName: 'Charlie', reporterId: '6', reporterName: 'Dave' },
    { id: '6', title: 'Task 6', description: 'Description 6', state: TaskState.DONE, category: fakeTaskCategories[5], startDate: new Date(), endDate: new Date(), assigneeId: '6', assigneeName: 'Dave', reporterId: '7', reporterName: 'Eve' },
  ];

  selectTask = (task: Task) => {
    this.selectedTask = task;
  }

  closeDrawer = () => {
    this.selectedTask = undefined;
  }

  openDialog = (task: Task | undefined) => {
    const dialogRef = this._dialog.open(EditTaskDialogComponent, {
      width: '500px',
      data: {
        task: task,
        users: [
          { id: '1', name: 'John Doe' },
          { id: '2', name: 'Jane Doe' },
          { id: '3', name: 'Alice' },
          { id: '4', name: 'Bob' },
          { id: '5', name: 'Charlie' },
          { id: '6', name: 'Dave' },
          { id: '7', name: 'Eve' },
        ],
        currentUser: this.currentUser,
        categories: this.categories,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  searchTasks = (term: string | undefined) => {
    console.log(term);
  }

  filterTasks = (state: string) => {
    console.log(state);
  }

  addNewTask = () => {
    this.openDialog(undefined);
  }

  deleteTask = (task: Task | undefined) => {
    console.log('Delete Task');
  }

  editTask = (task: Task) => {
    this.openDialog(task)
  }

  addComment = () => {
    console.log(this.newComment);
    this.newComment = '';
  }
}
