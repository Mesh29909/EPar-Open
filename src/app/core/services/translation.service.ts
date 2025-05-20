/**
 * Translation service for internationalization
 * @summary Service to handle language translations across the application
 * @author [Tu nombre y apellido]
 */
import { Injectable, EnvironmentInjector, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private defaultLang = 'en';
  private currentLang = 'en';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.defaultLang);
    this.translate.use(this.currentLang);
  }

  setLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  getCurrentLang(): string {
    return this.currentLang;
  }

  instant(key: string, params?: any): string {
    return this.translate.instant(key, params);
  }
}

export function provideTranslation(): EnvironmentProviders {
  return makeEnvironmentProviders([
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: 'TranslateLoader',
        useFactory: createTranslateLoader,
        deps: [EnvironmentInjector]
      }
    }).providers || []
  ]);
}

function createTranslateLoader(injector: EnvironmentInjector) {
  return {
    getTranslation: (lang: string) => {
      return fetch(`/assets/i18n/${lang}.json`)
        .then(response => response.json());
    }
  };
}
