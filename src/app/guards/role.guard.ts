import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = async (route, state) => {
  const auth = inject(Auth);
  const userService = inject(UserService);
  const router = inject(Router);

  const user = await new Promise<{ uid: string } | null>((resolve) => {
    onAuthStateChanged(auth, (authUser) => resolve(authUser ? { uid: authUser.uid } : null));
  });

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const profile = await userService.getUserProfile(user.uid);

  if (profile?.userRole === 'admin') {
    return true;
  }

  router.navigate(['/']);
  return false;
};
