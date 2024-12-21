import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { ContextService } from './core.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const contextService = inject(ContextService);
  contextService.showProgress.set(true);
  
  return next(req).pipe(
    finalize(() => contextService.showProgress.set(false))
  );
};
