import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharactersComponent } from './characters/characters.component';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';

const routes: Routes = [
    {
        path: '',
        component: CharactersComponent
    },
    {
        path: 'quiz',
        loadChildren: 'app/quiz/quiz.module#QuizModule',
        data: { preload: false }
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy]
})
export class AppRoutingModule { }
