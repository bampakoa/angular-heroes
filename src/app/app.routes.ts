import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { Characters } from './characters/characters';
import { Sidebar } from './layout/sidebar/sidebar';

export const routes: Routes = [
  {
    path: ':id',
    component: Sidebar,
    resolve: {
      character: (route: ActivatedRouteSnapshot) => inject(Characters).getSingle(+route.paramMap.get('id')!)
    }
  }
];
