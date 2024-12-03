import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from 'src/app/components/edit-task-dialog/edit-task-dialog.component';
import { Task, TaskState, TaskCategory } from 'src/app/model/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {


  openDrawer = false;
  selectedTask?: Task;

  fakeTasks: Task[] = [
    { id: '1', reporterName: 'Alice', reporterId: '1', assigneeName: 'John Doe', assigneeId: '1', title: 'Task 1', description: 'Task 1 Description', state: TaskState.TODO, category: TaskCategory.BUG, startDate: new Date(), endDate: new Date() },
    { id: '2', reporterName: 'Bob', reporterId: '2', assigneeName: 'Jane Doe', assigneeId: '2', title: 'Task 2', description: 'Task 2 Description', state: TaskState.DOING, category: TaskCategory.FEATURE, startDate: new Date(), endDate: new Date() },
    { id: '3', reporterName: 'Charlie', reporterId: '3', title: 'Task 3', description: 'Task 3 Description', state: TaskState.DONE, category: TaskCategory.IMPROVEMENT, startDate: new Date(), endDate: new Date() },
    { id: '4', reporterName: 'Dave', reporterId: '4', assigneeName: 'Eve', assigneeId: '3', title: 'Task 4', description: 'Task 4 Description', state: TaskState.CANCELLED, category: TaskCategory.BUG, startDate: new Date(), endDate: new Date() },
  ];

  constructor(
    private readonly _dialog: MatDialog
  ) { }

  selectTask = (task: Task) => {
    this.selectedTask = task;
  }

  closeDrawer = () => {
    this.selectedTask = undefined;
  }

  openDialog = () => {
    const dialogRef = this._dialog.open(EditTaskDialogComponent, {
      width: '500px',
      data: {
        title: 'Create Task',
        users: [{ id: '1', name: 'John Doe', email: '' }, { id: '2', name: 'Jane Doe', email: '' }],
        currentUser: { id: '1', name: 'John Doe', email: '' },
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
