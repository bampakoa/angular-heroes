import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = '<Your public key here>';
  const authReq = req.clone({ params: req.params.set('apikey', apiKey) });
  return next(authReq);
};
