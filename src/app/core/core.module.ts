import { NgModule } from '@angular/core';

import { ContextService } from './core.service';
import { Logger } from './logger.service';

@NgModule({
  providers: [
    ContextService,
    Logger
  ]
})
export class CoreModule {}
