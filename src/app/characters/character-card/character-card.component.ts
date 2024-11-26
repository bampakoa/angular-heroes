import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
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

  readonly character = input<Character>();
  readonly selectedChange = output<Character>();

  getCharacterImage() {
    const character = this.character();
    if (!character) { return; }
    return this.contextService.getImage('landscape_incredible', character.thumbnail);
  }

  showCharacter() {
    this.selectedChange.emit(this.character()!);
  }
}
