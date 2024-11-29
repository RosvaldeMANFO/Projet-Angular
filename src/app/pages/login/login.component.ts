import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = ''; 
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
}
