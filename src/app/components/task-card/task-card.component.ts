import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<void>();

  deleteTask = () => {
    this.delete.emit();
  }

  comment = () => {
    console.log('Commenting on task');
  }

  viewDetails = () => {
    console.log('Viewing task details');
  }
}
