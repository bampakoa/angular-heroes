import { Component, Input } from '@angular/core';

import { Character } from '../../core/character.model';
import { ContextService } from '../../core/core.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html'
})
export class CharacterDetailComponent {

  @Input() character: Character;

  constructor(private contextService: ContextService) {}

  getAvatar(): string {
    return this.contextService.getImage('standard_medium', this.character.thumbnail);
  }

  getCharacterImage(): string {
    return this.contextService.getImage('portrait_uncanny', this.character.thumbnail);
  }

  getCharacterLink(): string {
    const detail = this.character.urls.find(url => url.type === 'detail');
    return detail ? detail.url : 'http://marvel.com';
  }

}
