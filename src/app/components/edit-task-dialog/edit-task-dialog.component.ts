import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTaskDialogData } from 'src/app/model/edit-task-dialog-data.model';
import { TaskCategory, TaskState } from 'src/app/model/task.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
})
export class EditTaskDialogComponent implements OnInit {

  users: User[] = [];
  currentUser!: User ;
  reportedBy: User | null = null;
  TaskState = TaskState;
  TaskCategory = TaskCategory;
  form: FormGroup;
  
  constructor(
    private readonly _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EditTaskDialogData
  ) { 
    this.users = data.users;
    this.currentUser = data.currentUser;
    this.form = this._fb.group({
      id: new FormControl(data.task?.id),
      title: new FormControl(data.task?.title, [Validators.required]),
      description: new FormControl(data.task?.description, [Validators.required]),
      state: new FormControl(data?.task?.state ?? 'TODO', [Validators.required]),
      category: new FormControl(data.task?.category ?? 'BUG', [Validators.required]),
      startDate: new FormControl(data.task?.startDate ?? new Date(), [Validators.required, this.dateValidator()]),
      endDate: new FormControl(data.task?.endDate ?? new Date(), [Validators.required, this.dateValidator()]),
      assigneeName: new FormControl(data.task?.AssigneeName ?? this.currentUser.name),
      assigneeId: new FormControl(data.task?.AssigneeId ?? this.currentUser.id),
    });
  }
  ngOnInit(): void {
    this.form.get('assigneeName')?.valueChanges.subscribe(value => {
      this.form.get('assigneeId')?.setValue(this.users.find(user => user.name === value)?.id);
    });
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const selectedDate = new Date(control.value);
      selectedDate.setHours(0, 0, 0, 0);
      if (selectedDate < currentDate) {
        return { invalidDate: 'Date cannot be in the past' };
      }
      return null;
    };
  }
}
