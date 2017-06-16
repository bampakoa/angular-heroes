import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../app-material.module';
import { QuestionComponent } from './question/question.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizService } from './quiz.service';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  imports: [
    AppMaterialModule,
    CommonModule,
    QuizRoutingModule
  ],
  declarations: [
    QuestionComponent,
    QuizComponent
  ],
  providers: [QuizService]
})
export class QuizModule { }
