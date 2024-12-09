// user.service.ts
import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, collection, getDocs, updateDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async createOrUpdateUserProfile(uid: string, data: Partial<User>): Promise<void> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const existingData = userSnap.data() as User;
      const updatedData = {
        ...existingData,
        ...data,
        updatedAt: new Date(),
      };
      await setDoc(userRef, updatedData);
    } else {
      const newData = {
        ...data,
        userRole: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await setDoc(userRef, newData);
    }
  }

  async getUserProfile(uid: string): Promise<User | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { ...userSnap.data(), id: uid } as User;
    }
    return null;
  }
  
  async getUsers(): Promise<User[]> {
    const usersCollection = collection(this.firestore, 'users');
    const userDocs = await getDocs(usersCollection);

    return userDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as User));
  }

  async isAdmin(uid: string): Promise<boolean> {
    const userProfile = await this.getUserProfile(uid);
    return userProfile?.userRole === 'admin';
  }

  async updateUserRole(userId: string, newRole: string): Promise<void> {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      await updateDoc(userRef, { userRole: newRole });
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  }
}

