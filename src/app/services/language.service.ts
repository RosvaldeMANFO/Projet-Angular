import { Injectable } from '@angular/core';
import { translations } from 'src/assets/i18n/translations';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage: string = 'fr';

  setLanguage(language: string): void {
    localStorage.setItem('language', language);
    this.currentLanguage = language;
  }

  getLanguage(): string {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {      this.currentLanguage = storedLanguage;
    }
    return this.currentLanguage;
  }

  translate(key: string): string {
    const keys = key.split('.');
    let translation: any = translations[this.currentLanguage];

    for (const k of keys) {
      if (translation[k]) {
        translation = translation[k];
      } else {
        return key;
      }
    }

    return translation;
  }

}
