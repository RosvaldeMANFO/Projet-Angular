import { Inject, Injectable } from "@angular/core";
import {
  getStateColor,
  Period,
  Task,
  TasksByKey,
  TaskState,
} from "../model/task.model";
import {
  BehaviorSubject,
  map,
  Observable,
  Subscription
} from "rxjs";
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  orderBy,
  query,
  doc,
  setDoc,
  writeBatch,
  getDocs,
  deleteDoc,
} from "@angular/fire/firestore";
import { CategoryService } from "./category.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "./user.service";
import { User } from "../model/user.model";
import { fakeTasks2, fakeComments2 } from "../model/fake-data";
import { Comment } from "../model/comment.model";
import { DocumentData, where } from "firebase/firestore";
import { Auth } from "@angular/fire/auth";
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class TaskService {
  task = new BehaviorSubject<Task[]>([]);
  taskListSubscription?: Subscription;
  cachedTask: Task[] = [];
  currentState = 'ALL';
  commentsSubject = new BehaviorSubject<any[]>([]);
  comments$ = this.commentsSubject.asObservable();

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly firestore: Firestore,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    @Inject(Auth) private readonly auth: Auth
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
        commentCount: task['commentCount'],
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
  getComments(taskId: string): Observable<Comment[]> {
    return from(this.userService.getUsers()).pipe(
      switchMap((users: User[]) => {
        const commentsCollection = collection(this.firestore, "comments");
        const commentsQuery = query(
          commentsCollection,
          where("taskId", "==", taskId),
          orderBy("createdAt")
        );
  
        return collectionData(commentsQuery, { idField: "id" }).pipe(
          map((comments) => {
            return comments.map((comment) => {
              const author = users.find(
                (user) => user.id === comment["authorId"]
              );
              return {
                id: comment["id"],
                taskId: taskId,
                authorId: comment["authorId"],
                authorName: author?.nickname ?? "Unknown",
                content: comment["content"],
                createdAt: comment["createdAt"].toDate(),
              };
            });
          })
        );
      })
    );
  }
  
  loadComments(): void {
    const commentsCollection = collection(this.firestore, "comments");
    const queryObservable = collectionData(commentsCollection, { idField: "id" });

    queryObservable.subscribe((comments) => {
      this.commentsSubject.next(comments);
    });
  }
  
  countTaskComments(taskId: string): Observable<number> {
    const commentsCollection = collection(this.firestore, "comments");
    const commentsQuery = query(commentsCollection, where("taskId", "==", taskId));
    return collectionData(commentsQuery, { idField: "id" }).pipe(
      map((comments) => comments.length)
    );
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
    await this.deleteAllComments(taskId);
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
      const docRef = doc(taskCollection, task.id);
      batch.set(docRef, task);
    });
  
    await batch.commit();
    await this.mockComments();
  
    this.snackBar.open("Mock tasks added successfully", "Close", {
      duration: 2000,
    });
  }
  
  async mockComments() {
    const commentsCollection = collection(this.firestore, "comments");
    const batch = writeBatch(this.firestore);
  
    fakeComments2.forEach((comment) => {
  
      const docRef = doc(commentsCollection);
      batch.set(docRef, {
        taskId: comment.taskId,
        authorId: comment.authorId,
        content: comment.content,
        createdAt: new Date(),
      });
   
    });
  
    await batch.commit();
  }
  

  getTaskByUserId(userId: string): Observable<Promise<Task[]>> {
    const tasksCollection = collection(this.firestore, 'tasks');
    const tasksQuery = query(tasksCollection, where('reporterId', '==', userId));
    const tasksSnapshot = collectionData(tasksQuery, { idField: 'id' });
    return tasksSnapshot.pipe(
      map(tasks => this.taskMapper(tasks))
    );
  }
  
  getAssignedTaskByUserId(userId: string): Observable<Promise<Task[]>> {
    const tasksCollection = collection(this.firestore, 'tasks');
    const tasksQuery = query(tasksCollection, where('assigneeId', '==', userId));
    const tasksSnapshot = collectionData(tasksQuery, { idField: 'id' });
    return tasksSnapshot.pipe(
      map(tasks => this.taskMapper(tasks))
    );
  }

  async addComment(comment: Comment) {
    const commentsCollection = collection(this.firestore, "comments");

    try {
      await addDoc(commentsCollection, {
        taskId: comment.taskId,
        authorId: this.auth.currentUser?.uid,
        content: comment.content,
        createdAt: comment.createdAt,
      });
      this.snackBar.open("Comment added successfully", "Close", {
        duration: 2000,
      });
    } catch (error) {
      this.snackBar.open("Error adding comment", "Close", {
        duration: 2000,
      });
      console.error("Error adding comment:", error);
    }
  }

  async deleteComment(commentId: string): Promise<void> {
    try {
      const commentRef = doc(this.firestore, "comments", commentId);
      await deleteDoc(commentRef);

      const updatedComments = this.commentsSubject
      .getValue()
      .filter((comment) => comment.id !== commentId);

      this.commentsSubject.next(updatedComments);
      
      this.snackBar.open("Comment deleted successfully", "Close", {
      duration: 2000,
      });

    } catch (error) {
      this.snackBar.open("Error deleting comment", "Close", {
      duration: 2000,
      });
      console.error("Error deleting comment:", error);
    }
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
  
      for (const docSnapshot of querySnapshot.docs) {
        const taskId = docSnapshot.id;
        await this.deleteAllComments(taskId);
        batch.delete(doc(this.firestore, `tasks/${taskId}`));
      }

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
  
  async deleteAllComments(taskId: string) {
    try {
      const commentsCollection = collection(this.firestore, "comments");
      const querySnapshot = await getDocs(commentsCollection);
  
      const batch = writeBatch(this.firestore);
  
      querySnapshot.forEach((docSnapshot) => {
        const commentData = docSnapshot.data();
        if (commentData['taskId'] === taskId) {
          batch.delete(doc(this.firestore, `comments/${docSnapshot.id}`));
        }
      });
  
      await batch.commit();
  
      console.log(`All comments for task ${taskId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting comments for task ${taskId}:`, error);
    }
  }
  
}
