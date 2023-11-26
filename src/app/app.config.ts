import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  apiKey: string;
  errorPrefix: string;
  title: string;
  charactersLimit: number;
}

export const appSettings: AppConfig = {
  apiUrl: 'https://gateway.marvel.com/v1/public/',
  apiKey: '<Your public key here>',
  errorPrefix: '[Angular Heroes Error] ',
  title: 'Angular Heroes',
  charactersLimit: 20
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
