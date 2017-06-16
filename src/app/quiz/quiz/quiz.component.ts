import { Component, OnInit } from '@angular/core';

import { Question } from '../question.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
export class QuizComponent implements OnInit {
  hero: string;
  questions: Question[];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.questions = this.quizService.getQuestions();
  }

  submit() {
    this.hero = this.quizService.getHero();
  }

}
