import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatIconAnchor,
    MatIcon,
    MatTooltip,
    NgOptimizedImage
  ]
})
export class Header {}
