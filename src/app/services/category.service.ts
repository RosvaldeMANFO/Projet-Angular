import { Injectable } from "@angular/core";
import { TaskCategory } from "../model/task.model";
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
import { BehaviorSubject, firstValueFrom, take } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class CategoryService {
  categories = new BehaviorSubject<TaskCategory[]>([]);

  constructor(private readonly firestore: Firestore) {
    this.init();
  }

  init(): void {
    fakeTaskCategories.forEach((category: TaskCategory) => {
      this.addCategory(category);
    });
    this.getCategories();
  }

  async addCategory(category: TaskCategory): Promise<void> {
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
      const mappedCategories = categories.map<TaskCategory>((category) => {
        return {
          id: category["id"],
          name: category["name"],
          color: category["color"],
        };
      });
      this.categories.next(mappedCategories);
    });
  }
}
