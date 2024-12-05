import { Component, OnInit } from "@angular/core";
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
  
  
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit() {
    const tasks = this.taskService.getTasks();
    const users = this.userService.getUsers();
    this.categoryService.categories.subscribe((categories) => {
      this.nbrTasks = tasks.length;
      this.nbrUsers = users.length;
      this.nbrCategories = categories.length;
      this.nbrComments = 100;
    });
  }
}
