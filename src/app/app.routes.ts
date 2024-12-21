import { Routes } from '@angular/router';

import { characterResolver } from './characters/character.resolver';
import { SidebarComponent } from './core/sidebar/sidebar.component';

export const routes: Routes = [
  {
    path: ':id',
    component: SidebarComponent,
    resolve: {
      character: characterResolver
    }
  }
];
