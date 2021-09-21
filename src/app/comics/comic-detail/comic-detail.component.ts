import { Component, Input } from '@angular/core';

import { ContextService } from '../../core/core.service';
import { Comic } from '../comic.model';

@Component({
  selector: 'app-comic-detail',
  template: `
    <a href="https://read.marvel.com/#/book/{{comic?.digitalId}}" target="_blank">
      <img [src]="getComicImage()">
    </a>
  `
})
export class ComicDetailComponent {

  @Input() comic: Comic | undefined;

  constructor(private contextService: ContextService) {}

  getComicImage(): string | undefined {
    if (this.comic) {
      return this.contextService.getImage('portrait_fantastic', this.comic.thumbnail);
    }
  }

}
