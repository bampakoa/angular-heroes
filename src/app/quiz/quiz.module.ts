import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import { QuestionComponent } from './question/question.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizService } from './quiz.service';
import { QuizComponent } from './quiz/quiz.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    FlexLayoutModule,
    QuizRoutingModule,
    SharedModule
  ],
  declarations: [
    QuestionComponent,
    QuizComponent
  ],
  providers: [QuizService]
})
export class QuizModule { }
