import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { Character } from '../../core/character.model';
import { ContextService } from '../../core/core.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html'
})
export class CharacterCardComponent {
  private contextService = inject(ContextService);

  @Input() character: Character | undefined;
  @Output() selectedChange = new EventEmitter<Character>();

  getCharacterImage() {
    if (!this.character) { return; }
    return this.contextService.getImage('landscape_incredible', this.character.thumbnail);
  }

  showCharacter() {
    this.selectedChange.emit(this.character);
  }
}
