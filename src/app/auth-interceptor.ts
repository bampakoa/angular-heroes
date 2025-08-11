import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = '<Your public key here>';
  const snackbar = inject(MatSnackBar);
  
  const authReq = req.clone({ params: req.params.set('apikey', apiKey) });
  
  return next(authReq).pipe(
    catchError(() => {
      snackbar.open('Something bad happened! Please try again later.');
      return EMPTY;
    })
  );
};
