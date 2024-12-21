import { Component, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

import { CharacterListComponent } from './characters/character-list/character-list.component';
import { ContextService } from './core/core.service';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    HeaderComponent,
    FooterComponent,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    CharacterListComponent,
    RouterOutlet,
    MatProgressBar
  ]
})
export class AppComponent {
  showProgress = inject(ContextService).showProgress;
}
