import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  errorPrefix: string;
  title: string;
  version: string;
  charactersLimit: number;
}

export const appSettings: AppConfig = {
  apiUrl: 'https://gateway.marvel.com/v1/public/',
  errorPrefix: '[Angular Heroes Error] ',
  title: 'Angular Heroes',
  version: '1.4.0',
  charactersLimit: 20
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');