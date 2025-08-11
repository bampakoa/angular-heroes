import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { LoadingIndicator } from './loading-indicator';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const indicator = inject(LoadingIndicator);
  indicator.showProgress.set(true);
  
  return next(req).pipe(
    finalize(() => indicator.showProgress.set(false))
  );
};
