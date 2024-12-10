import { Injectable } from '@angular/core';
import { getStateColor, Period, Task, TasksByKey, TaskState } from '../model/task.model';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { Firestore, collection, collectionData, addDoc, orderBy, query, doc, setDoc, writeBatch, getDocs, deleteDoc } from '@angular/fire/firestore';
import { CategoryService } from './category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';
import { User } from '../model/user.model';
import { fakeTasks2 } from '../model/fake-data';
import { DocumentData, where } from 'firebase/firestore';


@Injectable({
  providedIn: "root",
})
export class TaskService {
  task = new BehaviorSubject<Task[]>([]);
  taskListSubscription?: Subscription;
  cachedTask: Task[] = [];
  currentState = 'ALL';

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly firestore: Firestore,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService
  ) {
    this.getTasks();
  }

  
  private async taskMapper(tasks: DocumentData[]): Promise<Task[]> {
    const users = await this.userService.getUsers();
    return tasks.map<Task>((task) => {
      const category = this.categoryService.categories.value
        .find(category => category.id === task['categoryId']);
      return {
        id: task['id'],
        title: task['title'],
        reporterId: task['reporterId'],
        reporterName: task['reporterName'],
        assigneeId: task['assigneeId'],
        assigneeName: users.find(user => user.id === task['assigneeId'])?.nickname,
        description: task['description'],
        state: task['state'] as TaskState,
        category: category!!,
        startDate: task['startDate'].toDate(),
        endDate: task['endDate'].toDate(),
        createdAt: task['createdAt'].toDate(),
      };
    });
  }


  getTasks() {
    if (this.taskListSubscription) {
      this.taskListSubscription.unsubscribe();
    }
    const tasksCollection = collection(this.firestore, 'tasks');
    const tasksQuery = query(tasksCollection, orderBy('title'));
    collectionData(tasksQuery, { idField: 'id' }).subscribe(async (tasks) => {
      const mappedTasks = await this.taskMapper(tasks);
      this.cachedTask = mappedTasks;
      this.task.next(mappedTasks);
    });
  }

  async getComents(taskId: string): Promise<Comment[]> {
    const currentComments: Comment[] = [];
    const commentsCollection = collection(this.firestore, "comments");
    const commentsQuery = query(
      commentsCollection,
      where("taskId", "==", taskId),
      orderBy("createdAt")
    );
    collectionData(commentsQuery, { idField: "id" }).subscribe((comments) => {
      const mappedComments = comments.map<Comment>((comment) => {
        const author = this.users.find(
          (user) => user.id === comment["authorId"]
        );
        return {
          id: comment["id"],
          taskId: taskId,
          authorId: comment["authorId"],
          authorName: author?.nickname ?? "",
          content: comment["content"],
          createdAt: comment["createdAt"].toDate(),
        };
      });
      currentComments.push(...mappedComments);
    });

    return currentComments;
  }

  setTask(task: Task) {
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
    };

    if (task.id) {
      const taskDocRef = doc(this.firestore, `tasks/${task.id}`);
      setDoc(taskDocRef, data);
      this.snackBar.open("Task updated successfully", "Close", {
        duration: 2000,
      });
    } else {
      const tasksCollection = collection(this.firestore, "tasks");
      addDoc(tasksCollection, data);
      this.snackBar.open("Task added successfully", "Close", {
        duration: 2000,
      });
    }
  }

  async deleteTask(taskId: string) {
    const taskRef = doc(this.firestore, "tasks", taskId);
    await deleteDoc(taskRef);
    this.getTasks();
    this.snackBar.open("Task deleted successfully", "Close", {
      duration: 2000,
    });
  }

  filterByState(state: string) {
    this.task.next(
      state === "ALL"
        ? this.cachedTask
        : this.cachedTask.filter((task) => task.state === state)
    );
    this.currentState = state;
  }

  searchTask(term: string | undefined) {
    if (term) {
      const filteredTasks = this.cachedTask.filter((task) => {
        const matchesTerm =
          task.title.toLowerCase().includes(term.toLowerCase()) ||
          task.description.toLowerCase().includes(term.toLowerCase());
        const matchesState =
          this.currentState === "ALL" || task.state === this.currentState;
        return matchesTerm && matchesState;
      });
      this.task.next(filteredTasks);
    } else {
      this.task.next(
        this.cachedTask.filter(
          (task) =>
            this.currentState === "ALL" || task.state === this.currentState
        )
      );
    }
  }

  async addMockTasks() {
    const taskCollection = collection(this.firestore, "tasks");
    const categories = this.categoryService.categories.value;
    const users = await this.userService.getUsers();

    const fakeTasks = fakeTasks2.map((task) => {
      const category = categories.find(
        (category) => category.name === task.categoryName
      );
      const assignee = users[Math.floor(Math.random() * users.length)];

      return {
        ...task,
        categoryId: category?.id,
        assigneeId: assignee?.id,
      };
    });

    const batch = writeBatch(this.firestore);
    fakeTasks.forEach((task) => {
      const docRef = doc(taskCollection);
      batch.set(docRef, task);
    });

    await batch.commit();

    this.snackBar.open("Mock tasks added successfully", "Close", {
      duration: 2000,
    });
  }

  getTaskByUserId(userId: string): Observable<Promise<Task[]>> {
    const tasksCollection = collection(this.firestore, 'tasks');
    const tasksQuery = query(tasksCollection, where('reporterId', '==', userId));
    const tasksSnapshot = collectionData(tasksQuery, { idField: 'id' });
    return tasksSnapshot.pipe(
      map(tasks => this.taskMapper(tasks))
    );
  }

  countTasksByStatusAndDate(period?: Period): TasksByKey {
    return this.cachedTask.reduce((acc: TasksByKey, task) => {
      if (!period) {
        const status = task.state;
        acc[status] = acc[status]
          ? { ...acc[status], count: acc[status].count + 1 }
          : {
              count: 1,
              color: getStateColor(status),
              createdAt: task.createdAt,
            };
        return acc;
      }

      const isWithinPeriod = this.isTaskWithinPeriod(task, period);

      if (isWithinPeriod) {
        const status = task.state;
        acc[status] = acc[status]
          ? { ...acc[status], count: acc[status].count + 1 }
          : {
              count: 1,
              color: getStateColor(status),
              createdAt: task.createdAt,
            };
      }
      return acc;
    }, {});
  }

  countTasksByCategoryAndDate(period?: Period): TasksByKey {
    return this.cachedTask.reduce((acc: TasksByKey, task) => {
      if (!period) {
        const categoryName = task.category.name;
        acc[categoryName] = acc[categoryName]
          ? { ...acc[categoryName], count: acc[categoryName].count + 1 }
          : { count: 1, color: task.category.color, createdAt: task.createdAt };
        return acc;
      }

      const isWithinPeriod = this.isTaskWithinPeriod(task, period);

      if (isWithinPeriod) {
        const categoryName = task.category.name;
        acc[categoryName] = acc[categoryName]
          ? { ...acc[categoryName], count: acc[categoryName].count + 1 }
          : { count: 1, color: task.category.color, createdAt: task.createdAt };
      }
      return acc;
    }, {});
  }

  private isTaskWithinPeriod(task: Task, period: Period): boolean {
    return (
      ((!period.startDate || task.createdAt >= period.startDate) &&
        (!period.endDate || task.createdAt <= period.endDate)) ||
      (period.startDate &&
        period.endDate &&
        task.startDate <= period.endDate &&
        task.endDate >= period.startDate)
    );
  }

  async deleteAllTasks() {
    try {
      const tasksCollection = collection(this.firestore, "tasks");
      const querySnapshot = await getDocs(tasksCollection);

      const batch = writeBatch(this.firestore);
      querySnapshot.forEach((docSnapshot) => {
        batch.delete(doc(this.firestore, `tasks/${docSnapshot.id}`));
      });

      await batch.commit();

      this.snackBar.open("All tasks deleted successfully", "Close", {
        duration: 2000,
      });
      console.log("All tasks deleted");
    } catch (error) {
      this.snackBar.open("Error deleting tasks", "Close", {
        duration: 2000,
      });
      console.error("Error deleting tasks:", error);
    }
  }
}