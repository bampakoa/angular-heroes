import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageService } from './image.service';
import { LoadingService } from './loading.service';
import { NavService } from './nav.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ImageService,
    LoadingService,
    NavService
  ]
})
export class CoreModule { }
