import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  deleteTask = (event: Event) => {
    event.stopPropagation();
    this.delete.emit();
  }

  editTask = (event: Event) => {
    event.stopPropagation();
    this.edit.emit();
  }
}
