import { Injectable, OnInit } from "@angular/core";
import { Task, TaskCategory2, TaskState } from "../model/task.model";
import { fakeTaskCategories } from "../model/fake-data";

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  orderBy,
  query,
  where,
} from "@angular/fire/firestore";
import { BehaviorSubject, firstValueFrom, Subscription, take } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class CategoryService {
  categories = new BehaviorSubject<TaskCategory2[]>([]);
  constructor(private readonly firestore: Firestore) {
    this.init();
  }
  init(): void {
    console.log("Category Service initialized");
    console.log("Categories fetched", this.categories.value);
    fakeTaskCategories.forEach((category: TaskCategory2) => {
      this.addCategory(category);
    });
    this.getCategories();
  }

  async addCategory(category: TaskCategory2): Promise<void> {
    const categoriesCollectionRef = collection(this.firestore, "categories");

    const existingCategories = await firstValueFrom(
      collectionData(
        query(categoriesCollectionRef, where("name", "==", category.name))
      ).pipe(take(1))
    );

    if (existingCategories.length === 0) {
      await addDoc(categoriesCollectionRef, {
        name: category.name,
        color: category.color,
      });
    }
  }

  getCategories(): void {
    const categoryCollectionRef = collection(this.firestore, "categories");
    const categoryQuery = query(categoryCollectionRef, orderBy("name"));
    collectionData(categoryQuery, { idField: "id" }).subscribe((categories) => {
      const mappedCategories = categories.map<TaskCategory2>((category) => {
        return {
          id: category["id"],
          name: category["name"],
          color: category["color"],
        };
      });
      console.log("Categories", mappedCategories);
      this.categories.next(mappedCategories);
    });
  }
}
