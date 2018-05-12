import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterListComponent } from './characters/character-list/character-list.component';

const routes: Routes = [
  {
    path: '',
    component: CharacterListComponent
  },
  {
    path: 'quiz',
    loadChildren: 'app/quiz/quiz.module#QuizModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
