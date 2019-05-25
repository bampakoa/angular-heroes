import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppMaterialModule } from '../app-material.module';
import { SharedModule } from '../shared/shared.module';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { QuizService } from './quiz.service';

@NgModule({
  declarations: [QuizComponent],
  imports: [
    AppMaterialModule,
    FlexLayoutModule,
    QuizRoutingModule,
    SharedModule
  ],
  providers: [QuizService]
})
export class QuizModule {}
