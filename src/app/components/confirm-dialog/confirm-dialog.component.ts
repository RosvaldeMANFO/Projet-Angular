import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  title: string | undefined;
  message: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string },
    public readonly languageService: LanguageService,
  ) {
    this.title = data.title;
    this.message = data.message;
  }
}
