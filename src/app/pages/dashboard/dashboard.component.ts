import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { fakeComments } from "src/app/model/fake-data";
import { Period, TasksByKey } from "src/app/model/task.model";
import { CategoryService } from "src/app/services/category.service";
import { TaskService } from "src/app/services/task.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit {
  nbrTasks: number = 0;
  nbrUsers: number = 0;
  nbrCategories: number = 0;
  nbrComments: number = 0;
  tasksByStatus: TasksByKey = {};
  tasksByCategory: TasksByKey = {};
  topFiveTasks: { taskName: string; commentCount: number }[] = [];
  dateRangeForm!: FormGroup;

  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private fb: FormBuilder
  ) {}


  async ngOnInit() {
    this.taskService.task.subscribe((tasks) => {
      this.nbrTasks = tasks.length;
  
    this.initializeDateRangeForm();
    this.loadDashBoardData();

    this.dateRangeForm.valueChanges.subscribe((value) => {
      if (value.startDate && value.endDate) {
        this.loadDashBoardData();
      }
    });
  });
  }

  initializeDateRangeForm(): void {
    const now = new Date();
    const startDate = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const endDate = now;

    this.dateRangeForm = this.fb.group({
      startDate,
      endDate,
    });
  }

  async loadDashBoardData(): Promise<void> {
    const users = await this.userService.getUsers();
    this.categoryService.categories.subscribe(async (categories) => {
      this.nbrUsers = (users).length;
      this.nbrCategories = categories.length;
      this.nbrComments = 100;
    });

    const { startDate, endDate } = this.dateRangeForm.value;

    this.tasksByStatus = this.taskService.countTasksByStatusAndDate({
      startDate: startDate,
      endDate: endDate,
    });

    this.tasksByCategory = this.taskService.countTasksByCategoryAndDate({
      startDate: startDate,
      endDate: endDate,
    });

    this.topFiveTasks = fakeComments.sort(
      (a, b) => b.commentCount - a.commentCount
    );
  }
}
