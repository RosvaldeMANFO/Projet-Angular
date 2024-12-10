import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private userService: UserService,
    public readonly languageService: LanguageService
  ) {}

  async signUp() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      const user = userCredential.user;

      if (user) {
        const nickname = this.email.split('@')[0];
        const defaultBio = 'This user has not provided a bio yet.';
        await this.userService.createOrUpdateUserProfile(user.uid, {
          email: user.email ?? '',
          nickname,
          bio: defaultBio,
        });
      }
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error during sign up:', error);
      this.errorMessage = (error as Error).message;
    }
  }
}
