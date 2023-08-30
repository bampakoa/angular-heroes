import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APP_CONFIG, AppConfig } from './app.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ params: req.params.set('apikey', this.config.apiKey) });
    return next.handle(authReq);
  }

}
