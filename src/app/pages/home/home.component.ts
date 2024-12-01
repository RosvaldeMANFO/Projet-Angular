import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from 'src/app/components/edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly _dialog: MatDialog,
  ) {}
  
  ngOnInit(): void {
    this.openDialog()
  }

  openDialog() {
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
