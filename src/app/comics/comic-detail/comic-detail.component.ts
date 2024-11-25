import { Component, Input } from '@angular/core';

import { ContextService } from '../../core/core.service';
import { Comic } from '../comic.model';

@Component({
  selector: 'app-comic-detail',
  template: `
    <a href="https://read.marvel.com/#/book/{{comic?.digitalId}}" target="_blank">
      <img [ngSrc]="getComicImage()!" width="168" height="252" />
    </a>
  `
})
export class ComicDetailComponent {

  @Input() comic: Comic | undefined;

  constructor(private contextService: ContextService) {}

  getComicImage() {
    if (!this.comic) { return; }
    return this.contextService.getImage('portrait_fantastic', this.comic.thumbnail);
  }

}
