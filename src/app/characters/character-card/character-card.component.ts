import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Character } from '../../core/character.model';
import { ContextService } from '../../core/core.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html'
})
export class CharacterCardComponent {

  @Input() character: Character | undefined;
  @Output() selectedChange = new EventEmitter<Character>();

  constructor(private contextService: ContextService) {}

  getCharacterImage(): string | undefined {
    if (this.character) {
      return this.contextService.getImage('landscape_incredible', this.character.thumbnail);
    }
  }

  showCharacter() {
    this.selectedChange.emit(this.character);
  }

}
