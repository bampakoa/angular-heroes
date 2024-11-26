import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatLine } from '@angular/material/core';
import { MatGridTileText, MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';

import { Character } from '../../core/character.model';
import { ContextService } from '../../core/core.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  imports: [NgOptimizedImage, MatGridTileText, MatGridTileHeaderCssMatStyler, MatLine, MatIconButton, MatIcon]
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
