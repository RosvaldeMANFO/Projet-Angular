import { Injectable } from "@angular/core";
import { TaskCategory2 } from "../model/task.model";
import { fakeTaskCategories } from "../model/fake-data";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor() {}

  getCategories(): TaskCategory2[] {
    return fakeTaskCategories;
  }
}
