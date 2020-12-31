import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../environments/environment';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {}

  handleError(error: Error) {
    this.injector.get(MatSnackBar).open(environment.settings.appErrorPrefix + error.message);
    console.log(error);
  }

}
