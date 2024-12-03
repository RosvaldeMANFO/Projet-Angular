import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit {
  
  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const tasks = this.taskService.getTasks();
    const users = this.userService.getUsers();
    console.log(tasks, users);
  }
}
