import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconAnchor } from '@angular/material/button';
import { MatLine } from '@angular/material/core';
import { MatGridTileText, MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { Character } from '../../models/character';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.html',
  imports: [NgOptimizedImage, MatGridTileText, MatGridTileHeaderCssMatStyler, MatLine, MatIconAnchor, MatIcon, RouterLink]
})
export class CharacterCard {
  readonly character = input.required<Character>();
}
