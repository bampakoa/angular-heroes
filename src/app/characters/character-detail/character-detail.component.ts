import { NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import {
  MatCard,
  MatCardHeader,
  MatCardAvatar,
  MatCardTitle,
  MatCardSubtitle,
  MatCardImage,
  MatCardContent,
  MatCardActions
} from '@angular/material/card';

import { Character } from '../../core/character.model';
import { ContextService } from '../../core/core.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    NgOptimizedImage,
    MatCardAvatar,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatAnchor,
    UpperCasePipe
  ]
})
export class CharacterDetailComponent {
  private contextService = inject(ContextService);

  readonly character = input<Character>();

  getAvatar() {
    const character = this.character();
    if (!character) { return; }
    return this.contextService.getImage('standard_medium', character.thumbnail);
  }

  getCharacterImage() {
    const character = this.character();
    if (!character) { return; }
    return this.contextService.getImage('portrait_uncanny', character.thumbnail);
  }
}
