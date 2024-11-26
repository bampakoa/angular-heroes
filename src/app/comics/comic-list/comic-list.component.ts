import { AsyncPipe } from '@angular/common';
import { Component, Input, OnChanges, signal, inject } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { EMPTY, finalize, map, Observable } from 'rxjs';

import { Character } from '../../core/character.model';
import { ComicDetailComponent } from '../comic-detail/comic-detail.component';
import { Comic } from '../comic.model';
import { ComicService } from '../comics.service';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  imports: [MatGridList, MatGridTile, MatProgressSpinner, ComicDetailComponent, AsyncPipe]
})
export class ComicListComponent implements OnChanges {
  private comicService = inject(ComicService);

  @Input() character: Character | undefined;
  comics$: Observable<Comic[]> = EMPTY;
  showProgress = signal(false);

  ngOnChanges() {
    this.showProgress.set(true);

    if (this.character) {
      this.comics$ = this.comicService.getComics(this.character.id).pipe(
        map(comics => comics.filter(c => c.digitalId > 0)),
        finalize(() => this.showProgress.set(false))
      );
    }
  }
}
