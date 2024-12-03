import { Injectable } from "@angular/core";
import { User } from "../model/user.model";
import { fakeUsers } from "../model/fake-data";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor() {}

  getUsers(): User[] {
    return fakeUsers;
  }
}
