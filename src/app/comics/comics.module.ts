import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicListComponent } from './comic-list/comic-list.component';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    ComicDetailComponent,
    ComicListComponent
  ],
  exports: [ComicListComponent]
})
export class ComicsModule {}
