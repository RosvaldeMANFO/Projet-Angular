import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Promise<boolean>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.navigate(['/']); 
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
