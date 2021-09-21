import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { Character } from '../../core/character.model';
import { Comic } from '../comic.model';
import { ComicService } from '../comics.service';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html'
})
export class ComicListComponent implements OnChanges {

  @Input() character: Character | undefined;
  comics$: Observable<Comic[]> = EMPTY;
  showProgress = false;

  constructor(private comicService: ComicService, private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    this.showProgress = true;

    if (this.character) {
      this.comics$ = this.comicService.getComics(this.character.id).pipe(
        map(comics => comics.filter(c => c.digitalId > 0)),
        finalize(() => {
          this.showProgress = false;
          this.cdr.detectChanges();
        })
      );
    }
  }

  trackByComics(_: number, comic: Comic) { return comic.id; }

}
