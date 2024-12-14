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
  doc,
  getDocs,
  writeBatch,
} from "@angular/fire/firestore";
import { BehaviorSubject, firstValueFrom, map } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class CategoryService {
  categories = new BehaviorSubject<TaskCategory[]>([]);

  constructor(private readonly firestore: Firestore) {
    this.getCategories();
    //this.deleteAllCategories();
  }

  async addCategory(category: TaskCategory): Promise<void> {
    const categoriesCollectionRef = collection(this.firestore, "categories");
    await addDoc(categoriesCollectionRef, {
      name: category.name,
      color: category.color,
    });
  }

  async getCategories(): Promise<void> {
    const categoryCollectionRef = collection(this.firestore, "categories");
    const categoryQuery = query(categoryCollectionRef, orderBy("name"));
    const categories = await firstValueFrom(collectionData(categoryQuery, { idField: "id" }));
    const mappedCategories = categories.map<TaskCategory>((category) => {
      return {
        id: category["id"],
        name: category["name"],
        color: category["color"],
      };
    });
    const missingCategories = fakeTaskCategories.filter(
      (fakeCategory) =>
        mappedCategories.findIndex((category) => category.name === fakeCategory.name) === -1
    );
    if (missingCategories.length > 0) {
      for (const category of missingCategories) {
        await this.addCategory(category);
      }
      this.getCategories();
    }
    this.categories.next(mappedCategories);
  }

  async deleteAllCategories() {
    try {
      const categoriesCollection = collection(this.firestore, "categories");
      const querySnapshot = await getDocs(categoriesCollection);
      const batch = writeBatch(this.firestore);
  
      for (const docSnapshot of querySnapshot.docs) {
        const categoryId = docSnapshot.id;
        batch.delete(doc(this.firestore, `categories/${categoryId}`));
      }

      await batch.commit();
      console.log("All tasks deleted");
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  }
}
