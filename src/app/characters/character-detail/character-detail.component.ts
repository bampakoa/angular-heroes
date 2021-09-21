import { Component, Input } from '@angular/core';

import { Character } from '../../core/character.model';
import { ContextService } from '../../core/core.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html'
})
export class CharacterDetailComponent {

  @Input() character: Character | undefined;

  constructor(private contextService: ContextService) {}

  getAvatar(): string | undefined {
    if (this.character) {
      return this.contextService.getImage('standard_medium', this.character.thumbnail);
    }
  }

  getCharacterImage(): string | undefined {
    if (this.character) {
      return this.contextService.getImage('portrait_uncanny', this.character.thumbnail);
    }
  }

}
