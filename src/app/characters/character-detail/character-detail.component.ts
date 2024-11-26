import { NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
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
  standalone: true,
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
