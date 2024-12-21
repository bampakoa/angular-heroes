import { AsyncPipe } from '@angular/common';
import { Component, OnChanges, inject, input } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { EMPTY, map, Observable } from 'rxjs';

import { Character } from '../../core/character.model';
import { ComicDetailComponent } from '../comic-detail/comic-detail.component';
import { Comic } from '../comic.model';
import { ComicService } from '../comics.service';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  imports: [MatGridList, MatGridTile, ComicDetailComponent, AsyncPipe]
})
export class ComicListComponent implements OnChanges {
  private comicService = inject(ComicService);

  readonly character = input<Character>();
  comics$: Observable<Comic[]> = EMPTY;

  ngOnChanges() {
    const character = this.character();
    if (character) {
      this.comics$ = this.comicService.getAll(character.id).pipe(
        map(comics => comics.filter(c => c.digitalId > 0))
      );
    }
  }
}
