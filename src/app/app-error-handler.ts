import { ErrorHandler, Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { Logger } from './core/logger.service';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(private logger: Logger) {}

  handleError(error: Error) {
    this.logger.error(error.message, error, environment.settings.appErrorPrefix);
  }

}
