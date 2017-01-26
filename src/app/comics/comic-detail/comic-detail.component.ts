import { Component, Input } from '@angular/core';

import { Comic } from '../comic.model';
import { ImageService } from '../../core/image.service';

@Component({
  selector: 'app-comic-detail',
  template: `
     <a href="//read.marvel.com/#/book/{{comic.digitalId}}" target="_blank">
      <img [src]="getComicImage(comic.thumbnail)">
    </a>
  `
})
export class ComicDetailComponent {
  @Input() comic: Comic;

  constructor(private imageService: ImageService) { }

  getComicImage(thumbnail) {
    return this.imageService.getImage('portrait_fantastic', thumbnail);
  }

}
