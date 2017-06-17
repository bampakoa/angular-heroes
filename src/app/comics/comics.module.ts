import { NgModule } from '@angular/core';

import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicListComponent } from './comic-list/comic-list.component';
import { ComicsService } from './comics.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [
    ComicDetailComponent,
    ComicListComponent
  ],
  exports: [ComicListComponent],
  providers: [ComicsService]
})
export class ComicsModule { }
