import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: Auth, private router: Router,
    public readonly languageService: LanguageService,
  ) {}

  signUp() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error during sign up:', error);
        this.errorMessage = error.message;
      });
  }
}
