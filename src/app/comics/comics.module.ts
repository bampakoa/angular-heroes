import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicListComponent } from './comic-list/comic-list.component';
import { ComicsService } from './comics.service';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
  imports: [
    AppMaterialModule,
    CommonModule
  ],
  declarations: [
    ComicDetailComponent,
    ComicListComponent
  ],
  exports: [ComicListComponent],
  providers: [ComicsService]
})
export class ComicsModule { }
