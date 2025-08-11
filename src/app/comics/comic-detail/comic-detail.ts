import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

import { Comic } from '../comic';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.html',
  imports: [NgOptimizedImage]
})
export class ComicDetail {
  readonly comic = input.required<Comic>();
}
