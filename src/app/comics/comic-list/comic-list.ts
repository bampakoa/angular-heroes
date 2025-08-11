import { AsyncPipe } from '@angular/common';
import { Component, OnChanges, inject, input } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { EMPTY, map, Observable } from 'rxjs';

import { Character } from '../../models/character';
import { ComicDetail } from '../comic-detail/comic-detail';
import { Comic } from '../comic';
import { Comics } from '../comics';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.html',
  imports: [MatGridList, MatGridTile, ComicDetail, AsyncPipe]
})
export class ComicList implements OnChanges {
  private comicService = inject(Comics);

  readonly character = input.required<Character>();
  comics$: Observable<Comic[]> = EMPTY;

  ngOnChanges() {
    this.comics$ = this.comicService.getAll(this.character().id).pipe(
      map(comics => comics.filter(c => c.digitalId > 0))
    );
  }
}
