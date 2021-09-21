import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Thumbnail } from './thumbnail.model';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  copyright = '';

  constructor(private snackbar: MatSnackBar) {}

  getImage(variant: string, thumbnail: Thumbnail): string {
    return `${thumbnail.path}/${variant}.${thumbnail.extension}`;
  }

  handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Throw it so that it can be handled by the global application error handler.
      throw error;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.snackbar.open(environment.settings.appErrorPrefix + 'Something bad happened; please try again later.');
    }
    // return an ErrorObservable with a user-facing error message
    return throwError(error);
  };

}
