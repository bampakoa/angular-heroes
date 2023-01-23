import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppConfig, APP_CONFIG } from './app.config';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, @Inject(APP_CONFIG) private config: AppConfig) {}

  handleError(error: Error) {
    this.injector.get(MatSnackBar).open(this.config.errorPrefix + error.message);
    console.log(error);
  }

}
