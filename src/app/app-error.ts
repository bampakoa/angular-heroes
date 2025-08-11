import { ErrorHandler, Injectable, Injector, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  private injector = inject(Injector);

  handleError(error: Error) {
    this.injector.get(MatSnackBar).open(error.message);
    console.log(error);
  }
}
