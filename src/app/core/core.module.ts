import { NgModule } from '@angular/core';

import { ImageService } from './image.service';
import { LoadingService } from './loading.service';
import { NavService } from './nav.service';

@NgModule({
  providers: [
    ImageService,
    LoadingService,
    NavService
  ]
})
export class CoreModule { }
