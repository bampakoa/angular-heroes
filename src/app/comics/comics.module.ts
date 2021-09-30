import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicListComponent } from './comic-list/comic-list.component';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    ComicDetailComponent,
    ComicListComponent
  ],
  exports: [ComicListComponent]
})
export class ComicsModule {}
