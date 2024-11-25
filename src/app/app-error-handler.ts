import { ErrorHandler, Injectable, Injector, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { APP_CONFIG } from './app.config';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  private injector = inject(Injector);
  private config = inject(APP_CONFIG);

  handleError(error: Error) {
    this.injector.get(MatSnackBar).open(this.config.errorPrefix + error.message);
    console.log(error);
  }
}
