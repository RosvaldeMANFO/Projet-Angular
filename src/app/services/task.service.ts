import { Injectable } from '@angular/core';
import { Task, TaskState } from '../model/task.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Firestore, collection, collectionData, addDoc, orderBy, query, doc, setDoc } from '@angular/fire/firestore';
import { CategoryService } from './category.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class TaskService {


  task = new BehaviorSubject<Task[]>([])
  taskListSubscription?: Subscription;
  cachedTask: Task[] = [];

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly firestore: Firestore,
    private readonly categoryService: CategoryService,
  ) {
    this.getTasks();
  }

  getTasks() {
    if (this.taskListSubscription) {
      this.taskListSubscription.unsubscribe();
    }
    const tasksCollection = collection(this.firestore, 'tasks');
    const tasksQuery = query(tasksCollection, orderBy('title'));
    collectionData(tasksQuery, { idField: 'id' }).subscribe((tasks) => {
      const mappedTasks = tasks.map<Task>((task) => {
        const category = this.categoryService.categories.value
          .find(category => category.id === task['categoryId']);
        return {
          id: task['id'],
          title: task['title'],
          reporterId: task['reporterId'],
          reporterName: task['reporterName'],
          assigneeId: task['assigneeId'],
          assigneeName: task['assigneeName'],
          description: task['description'],
          state: task['state'] as TaskState,
          category: category!!,
          startDate: task['startDate'].toDate(),
          endDate: task['endDate'].toDate(),
          createdAt: task['createdAt'].toDate(),
        }
      });
      this.cachedTask = mappedTasks;
      this.task.next(mappedTasks);
    });
  }

  setTask(task: Task) {
    const data = {
      title: task.title,
      reporterId: task.reporterId,
      reporterName: task.reporterName,
      assigneeId: task.assigneeId,
      assigneeName: task.assigneeName,
      description: task.description,
      state: task.state,
      categoryId: task.category.id,
      startDate: task.startDate,
      endDate: task.endDate,
      createdAt: task.createdAt,
    }
    if (task.id) {
      const taskDocRef = doc(this.firestore, `tasks/${task.id}`);
      setDoc(taskDocRef, data);
      this.snackBar.open('Task updated successfully', 'Close', {
        duration: 2000,
      });
    } else {
      const tasksCollection = collection(this.firestore, 'tasks');
      addDoc(tasksCollection, data);
      this.snackBar.open('Task added successfully', 'Close', {
        duration: 2000,
      });
    }

  }

  getTaskByUserId(userId: string): Task[] {
    return this.cachedTask.filter(task => task.reporterId === userId);
  }

}
