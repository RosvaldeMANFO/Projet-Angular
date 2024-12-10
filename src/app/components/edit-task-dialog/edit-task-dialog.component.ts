import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTaskDialogData } from 'src/app/model/edit-task-dialog-data.model';
import { TaskCategory, TaskState } from 'src/app/model/task.model';
import { User } from 'src/app/model/user.model';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
})
export class EditTaskDialogComponent {
  users: User[] = [];
  currentUser!: User;
  reportedBy: User | null = null;
  TaskState = TaskState;
  categories: TaskCategory[] = [];
  form: FormGroup;
  taskID: string | undefined;

  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EditTaskDialogData,
    public readonly languageService: LanguageService,
  ) {
    this.categories = data?.categories;
    this.taskID = data?.task?.id;
    this.users = data?.users;
    this.currentUser = data?.currentUser;
    this.form = this.fb.group({
      id: new FormControl(data?.task?.id),
      title: new FormControl(data?.task?.title, [Validators.required]),
      reporterName: new FormControl(data?.task?.reporterName ?? this.currentUser.nickname),
      reporterId: new FormControl(data?.task?.reporterId ?? this.currentUser.id),
      description: new FormControl(data?.task?.description, [Validators.required]),
      state: new FormControl(data?.task?.state ?? 'TODO', [Validators.required]),
      category: new FormControl(data?.task?.category ?? this.categories[0], [Validators.required]),
      startDate: new FormControl(data?.task?.startDate ?? new Date(), [Validators.required, this.dateValidator()]),
      endDate: new FormControl(data?.task?.endDate ?? new Date(), [Validators.required, this.dateValidator()]),
      assigneeId: new FormControl(data?.task?.assigneeId),
      createdAt: new FormControl(data?.task?.createdAt ?? new Date()),
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
