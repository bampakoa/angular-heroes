import { Component, Input, OnChanges } from '@angular/core';

import { Comic } from '../comic.model';
import { ComicsService } from '../comics.service';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styles: [`
    md-spinner {
      margin: 105px;
    }
  `]
})
export class ComicListComponent implements OnChanges {
  @Input() characterId;
  comics: Comic[];
  showSpinner = false;

  constructor(private comicsService: ComicsService) { }

  getComics() {
    this.showSpinner = true;

    this.comicsService.getComics(this.characterId).then(comics => {
      this.showSpinner = false;
      this.comics = comics.filter(c => c.digitalId > 0);
    });
  }

  isReadable(comic: Comic) {
    return comic.digitalId !== 0;
  }

  ngOnChanges() {
    this.getComics();
  }

  trackByComics(index: number, comic: Comic) { return comic.id; }

}
