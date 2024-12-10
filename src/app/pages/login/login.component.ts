import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private auth: Auth,
    public readonly languageService: LanguageService,
  ) {}

  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
}
