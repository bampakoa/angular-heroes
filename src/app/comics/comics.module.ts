import { NgModule } from '@angular/core';

import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicListComponent } from './comic-list/comic-list.component';
import { ComicService } from './comics.service';
import { AppMaterialModule } from '../app-material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    AppMaterialModule,
    SharedModule
  ],
  declarations: [
    ComicDetailComponent,
    ComicListComponent
  ],
  providers: [ComicService],
  exports: [ComicListComponent]
})
export class ComicsModule {}
