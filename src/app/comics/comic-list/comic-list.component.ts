import { Component, Input, OnChanges, signal, inject } from '@angular/core';
import { EMPTY, finalize, map, Observable } from 'rxjs';

import { Character } from '../../core/character.model';
import { Comic } from '../comic.model';
import { ComicService } from '../comics.service';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html'
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
