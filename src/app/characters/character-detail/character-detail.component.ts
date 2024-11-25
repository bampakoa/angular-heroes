import { Component, Input, inject } from '@angular/core';

import { Character } from '../../core/character.model';
import { ContextService } from '../../core/core.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html'
})
export class CharacterDetailComponent {
  private contextService = inject(ContextService);

  @Input() character: Character | undefined;

  getAvatar() {
    if (!this.character) { return; }
    return this.contextService.getImage('standard_medium', this.character.thumbnail);
  }

  getCharacterImage() {
    if (!this.character) { return; }
    return this.contextService.getImage('portrait_uncanny', this.character.thumbnail);
  }
}
