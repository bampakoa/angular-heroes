import { Component, Input } from '@angular/core';
import { MdRadioChange } from '@angular/material';

import { Question } from '../question.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question: Question;

  constructor(private quizService: QuizService) {}

  setAnswer(change: MdRadioChange) {
    this.quizService.setAnswer(this.question, change.value);
  }

}
