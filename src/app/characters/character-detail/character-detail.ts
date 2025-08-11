import { NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
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

import { Character } from '../../models/character';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.html',
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
export class CharacterDetail {
  readonly character = input.required<Character>();
}
