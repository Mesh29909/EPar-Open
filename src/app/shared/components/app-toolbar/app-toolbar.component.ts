/**
 * App toolbar component
 * @summary Main navigation toolbar for the application
 * @author [Tu nombre y apellido]
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    TranslateModule
  ],
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})
export class AppToolbarComponent {
  logoUrl = 'https://logo.clearbit.com/eventify.io';

  constructor(private translationService: TranslationService) {}

  switchLanguage(language: string): void {
    this.translationService.setLanguage(language);
  }

  getCurrentLanguage(): string {
    return this.translationService.getCurrentLang();
  }
}
