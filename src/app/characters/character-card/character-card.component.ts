import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatIconAnchor } from '@angular/material/button';
import { MatLine } from '@angular/material/core';
import { MatGridTileText, MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { Character } from '../../core/character.model';
import { ContextService } from '../../core/core.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  imports: [NgOptimizedImage, MatGridTileText, MatGridTileHeaderCssMatStyler, MatLine, MatIconAnchor, MatIcon, RouterLink]
})
export class CharacterCardComponent {
  private contextService = inject(ContextService);

  readonly character = input<Character>();

  getCharacterImage() {
    const character = this.character();
    if (!character) { return; }
    return this.contextService.getImage('landscape_incredible', character.thumbnail);
  }
}
