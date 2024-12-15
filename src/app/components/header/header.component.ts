import { Component, OnInit } from '@angular/core';
import { Auth, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  userRole: string | null = null;
  isDropdownVisible = false;
  currentFlag = 'assets/language-flags/france.png'; 

  constructor(
    private auth: Auth,
    private router: Router,
    private userService: UserService,
    public readonly languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    const currentLanguage = this.languageService.getLanguage() as string;
    this.updateFlag(currentLanguage);

    this.auth.onAuthStateChanged(async (user) => {
      this.user = user;

      if (user) {
        const profile = await this.userService.getUserProfile(user.uid);
        this.userRole = profile?.userRole || null;
      }
    });
  }

  signOutUser() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  }

  openProfile() {
    this.router.navigate(['/profile', this.user?.uid]);
  }

  openDashboard() {
    this.router.navigate(['/dashboard']);
  }

  openMembers() {
    this.router.navigate(['/members']);
  }

  openTaskManagement() {
    this.router.navigate(['/management']);
  }

  toggleLanguageDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  changeLanguage(language: string) {
    this.languageService.setLanguage(language);
    this.updateFlag(language);
    this.isDropdownVisible = false; 
  }

  private updateFlag(language: string) {
    const flags: { [key: string]: string } = {
      fr: 'assets/language-flags/france.png',
      en: 'assets/language-flags/etats-unis.png',
      es: 'assets/language-flags/espagne.png',
      pt: 'assets/language-flags/portugal.png',
      de: 'assets/language-flags/allemagne.png',
      ru: 'assets/language-flags/russie.png',
      ja: 'assets/language-flags/japon.png',
      kr: 'assets/language-flags/coree-du-sud.png',
    };
    this.currentFlag = flags[language] || 'assets/language-flags/france.png';
  }
}
