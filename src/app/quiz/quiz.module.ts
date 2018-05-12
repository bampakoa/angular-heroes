import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz.component';
import { QuizService } from './quiz.service';
import { QuizRoutingModule } from './quiz-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    QuestionComponent,
    QuizComponent
  ],
  imports: [
    AppMaterialModule,
    FlexLayoutModule,
    QuizRoutingModule,
    SharedModule
  ],
  providers: [QuizService]
})
export class QuizModule {}
