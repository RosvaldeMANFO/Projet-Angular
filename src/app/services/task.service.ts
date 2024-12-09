import { Injectable } from '@angular/core';
import { getStateColor, Period, Task, TasksByKey, TaskState } from '../model/task.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Firestore, collection, collectionData, addDoc, orderBy, query, doc, setDoc, writeBatch, getDocs } from '@angular/fire/firestore';
import { CategoryService } from './category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';
import { User } from '../model/user.model';
import { fakeTasks2 } from '../model/fake-data';
import { deleteDoc } from 'firebase/firestore/lite';

@Injectable({
  providedIn: "root",
})
export class TaskService {

  task = new BehaviorSubject<Task[]>([])
  taskListSubscription?: Subscription;
  cachedTask: Task[] = [];
  users: User[] = [];
  currentState = 'ALL';

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly firestore: Firestore,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {
    this.getTasks();
    this.userService.getUsers().then(users => {
      this.users = users;
    });
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
          assigneeName: this.users.find(user => user.id === task['assigneeId'])?.nickname,
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
    console.log(task);
    const data = {
      title: task.title,
      reporterId: task.reporterId,
      reporterName: task.reporterName,
      assigneeId: task.assigneeId,
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

  async deleteTask(taskId: string) {
    const taskRef = doc(this.firestore, 'tasks', taskId);
    await deleteDoc(taskRef);
    this.getTasks();
    this.snackBar.open('Task deleted successfully', 'Close', {
      duration: 2000,
    });
  }

  filterByState(state: string) {
    if (state === 'ALL') {
      this.task.next(this.cachedTask);
    } else {
      const filteredTasks = this.cachedTask.filter((task) => {
        return task.state === state;
      });
      this.task.next(filteredTasks);
    }
    this.currentState = state;
  }

  searchTask(term: string | undefined) {
    if (term) {
      const filteredTasks = this.cachedTask.filter((task) => {
        return (task.title.toLowerCase().includes(term.toLowerCase()) ||
          task.description.toLowerCase().includes(term.toLowerCase())) &&
          (this.currentState === 'ALL' || task.state === this.currentState);
      });
      this.task.next(filteredTasks);
    } else {
      this.task.next(
        this.cachedTask.filter((task) => {
          return this.currentState === 'ALL' || task.state === this.currentState;
        })
      );
    }
  }

/**
 *  add this code to an existing component to test:
  addTasksToFirebase() {
    this.taskService.addTasks();
  }
*   and this tmplate:
  <div>
  <button (click)="addTasksToFirebase()">Add Mock Tasks</button>
  </div>
 */
  async addMockTasks() {
    const taskCollection = collection(this.firestore, 'tasks');
    for (const user of fakeTasks2) {
      try {
        await addDoc(taskCollection, {
          assigneeId: user.assigneeId,
          categoryId: user.categoryId,
          createdAt: user.createdAt,
          description: user.description,
          endDate: user.endDate,
          reporterId: user.reporterId,
          reporterName: user.reporterName,
          startDate: user.startDate,
          state: user.state,
          title: user.title,
        });
        console.log(`Task for ${user.assigneeName} added successfully!`);
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  }

  getTaskByUserId(userId: string): Task[] {
    return this.cachedTask.filter(task => task.reporterId === userId);
  }

  countTasksByStatusAndDate(period?: Period): TasksByKey {
    return this.cachedTask.reduce((acc: TasksByKey, task) => {
      if (!period) {
        const status = task.state;

        if (acc[status]) {
          acc[status].count += 1;
        } else {
          acc[status] = {
            count: 1,
            color: task.category.color,
            createdAt: task.createdAt,
          };
        }
        return acc;
      }

      const isWithinPeriod =
        ((!period.startDate || task.createdAt >= period.startDate) &&
          (!period.endDate || task.createdAt <= period.endDate)) ||
        (period.startDate &&
          period.endDate &&
          task.startDate <= period.endDate &&
          task.endDate >= period.startDate);

      if (isWithinPeriod) {
        const status = task.state;

        if (acc[status]) {
          acc[status].count += 1;
        } else {
          acc[status] = {
            count: 1,
            color: getStateColor(status),
            createdAt: task.createdAt,
          };
        }
      }
      return acc;
    }, {});
  }

  countTasksByCategoryAndDate(period?: Period): TasksByKey {
    return this.cachedTask.reduce((acc: TasksByKey, task) => {
      if (!period) {
        const categoryName = task.category.name;

        if (acc[categoryName]) {
          acc[categoryName].count += 1;
        } else {
          acc[categoryName] = {
            count: 1,
            color: task.category.color,
            createdAt: task.createdAt,
          };
        }
        return acc;
      }

      const isWithinPeriod =
        ((!period.startDate || task.createdAt >= period.startDate) &&
          (!period.endDate || task.createdAt <= period.endDate)) ||
        (period.startDate &&
          period.endDate &&
          task.startDate <= period.endDate &&
          task.endDate >= period.startDate);

      if (isWithinPeriod) {
        const categoryName = task.category.name;

        if (acc[categoryName]) {
          acc[categoryName].count += 1;
        } else {
          acc[categoryName] = {
            count: 1,
            color: task.category.color,
            createdAt: task.createdAt,
          };
        }
      }

      return acc;
    }, {});
  }
  
  deleteAllTasks() {
    const tasksCollection = collection(this.firestore, 'tasks');

    const batch = writeBatch(this.firestore);

    getDocs(tasksCollection).then(querySnapshot => {
      querySnapshot.forEach((docSnapshot) => {
        batch.delete(doc(this.firestore, `tasks/${docSnapshot.id}`));
      });

      batch.commit().then(() => {
        this.snackBar.open('All tasks deleted successfully', 'Close', {
          duration: 2000,
        });
        console.log('All tasks deleted');
      }).catch((error) => {
        console.error('Error deleting tasks: ', error);
        this.snackBar.open('Error deleting tasks', 'Close', {
          duration: 2000,
        });
      });
    }).catch((error) => {
      console.error('Error fetching tasks: ', error);
      this.snackBar.open('Error fetching tasks', 'Close', {
        duration: 2000,
      });
    });
  }
}
