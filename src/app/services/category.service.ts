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
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class CategoryService {
  categories = new BehaviorSubject<TaskCategory[]>([]);

  constructor(private readonly firestore: Firestore) {
    this.init();
  }

  init(): void {
  }

  async addCategory(category: TaskCategory): Promise<void> {
    const categoriesCollectionRef = collection(this.firestore, "categories");
    await addDoc(categoriesCollectionRef, {
      name: category.name,
      color: category.color,
    });
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
      if (mappedCategories.length === 0 || mappedCategories.length !== fakeTaskCategories.length) {
        const missingCategories = fakeTaskCategories.filter(fakeCategory => !mappedCategories.some(category => category.name === fakeCategory.name));
        missingCategories.forEach(async (category: TaskCategory) => {
          await this.addCategory(category);
        });
        this.getCategories()
      }
      this.categories.next(mappedCategories);
    });
  }
}
