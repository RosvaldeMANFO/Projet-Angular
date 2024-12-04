import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from 'src/app/components/edit-task-dialog/edit-task-dialog.component';
import { Task, TaskState, TaskCategory } from 'src/app/model/task.model';
import { Comment } from 'src/app/model/comment.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
 
  constructor(
    private readonly _dialog: MatDialog
  ) { }

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
    { id: '1', reporterName: 'Alice', reporterId: '1', assigneeName: 'John Doe', assigneeId: '1', title: 'Task 1', description: 'Task 1 Description', state: TaskState.TODO, category: TaskCategory.BUG, startDate: new Date(), endDate: new Date() },
    { id: '2', reporterName: 'Bob', reporterId: '2', assigneeName: 'Jane Doe', assigneeId: '2', title: 'Task 2', description: 'Task 2 Description', state: TaskState.DOING, category: TaskCategory.FEATURE, startDate: new Date(), endDate: new Date() },
    { id: '3', reporterName: 'Charlie', reporterId: '3', title: 'Task 3', description: 'Task 3 Description', state: TaskState.DONE, category: TaskCategory.IMPROVEMENT, startDate: new Date(), endDate: new Date() },
    { id: '4', reporterName: 'Dave', reporterId: '4', assigneeName: 'Eve', assigneeId: '3', title: 'Task 4', description: 'Task 4 Description', state: TaskState.CANCELLED, category: TaskCategory.BUG, startDate: new Date(), endDate: new Date() },
  ];

  selectTask = (task: Task) => {
    this.selectedTask = task;
  }

  closeDrawer = () => {
    this.selectedTask = undefined;
  }

  openDialog = (task: Task|undefined) => {
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
        currentUser: this.currentUser
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
