import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { fakeTasks } from '../model/fake-data';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Task[] {
    return fakeTasks;
  }

  
}
