import { Component, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

import { CharacterList } from './characters/character-list/character-list';
import { LoadingIndicator } from './loading-indicator';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    Header,
    Footer,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    CharacterList,
    RouterOutlet,
    MatProgressBar
  ]
})
export class App {
  showProgress = inject(LoadingIndicator).showProgress;
}
