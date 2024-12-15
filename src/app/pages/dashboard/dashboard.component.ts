import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Task, TaskCategory, TasksByKey } from "src/app/model/task.model";
import { CategoryService } from "src/app/services/category.service";
import { TaskService } from "src/app/services/task.service";
import { UserService } from "src/app/services/user.service";
import { LanguageService } from "src/app/services/language.service";
import { User } from "src/app/model/user.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit {
  users!: User[];
  taskList!: Task[];
  topFiveTasks!: Task[];
  nbrComments!: number;
  dateRangeForm!: FormGroup;
  categories!: TaskCategory[];
  tasksByStatus!: TasksByKey;
  tasksByCategory!: TasksByKey;

  constructor(
    private fb: FormBuilder,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    public readonly languageService: LanguageService
  ) {}

  async ngOnInit() {
    this.topFiveTasks = [];
    this.users = [];
    this.tasksByStatus = {};
    this.tasksByCategory = {};
    this.initializeDateRangeForm();
    this.taskService.task.subscribe((tasks) => {
      this.taskList = tasks;

      this.nbrComments = tasks.reduce(
        (acc, task) => acc + task.comments.length,
        0
      );
      
      this.loadDashBoardData();
      this.dateRangeForm.valueChanges.subscribe((value) => {
        if (value.startDate && value.endDate) {
          this.loadDashBoardData();
        }
      });
    });
  }

  // Un mois avant et un mois après la date actuelle
  initializeDateRangeForm(): void {
    const now = new Date();
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    );
    const startDate = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    this.dateRangeForm = this.fb.group({
      startDate,
      endDate,
    });
  }

  async loadDashBoardData(): Promise<void> {
    this.users = await this.userService.getUsers();
    this.categoryService.categories.subscribe(async (categories) => {
      this.categories = categories;
    });

    const { startDate, endDate } = this.dateRangeForm.value;

    this.tasksByStatus = this.taskService.countTasksByStatusAndDate({
      startDate: startDate,
      endDate: endDate
    });

    this.tasksByCategory = this.taskService.countTasksByCategoryAndDate({
      startDate: startDate,
      endDate: endDate,
    });

    this.topFiveTasks = this.taskList
      .filter((task) => {
        const taskDate = new Date(task.createdAt);
        return (
          taskDate.getTime() >= startDate.getTime() &&
          taskDate.getTime() <= endDate.getTime()
        );
      })
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 5);
  }
}
