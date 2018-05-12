import { Component, Input } from '@angular/core';

import { QuestionModel } from '../question.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  answer: 'yes' | 'no';
  @Input() question: QuestionModel;

  constructor(private quizService: QuizService) {}

  setAnswer() {
    this.quizService.setAnswer(this.question, this.answer);
  }
}
