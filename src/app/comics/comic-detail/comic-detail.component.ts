import { Component, Input } from '@angular/core';

import { ContextService } from '../../core/core.service';
import { Comic } from '../comic.model';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
})
export class ComicDetailComponent {
  @Input() comic: Comic;

  constructor(private contextService: ContextService) {}

  getComicImage(): string {
    return this.contextService.getImage('portrait_fantastic', this.comic.thumbnail);
  }
}
