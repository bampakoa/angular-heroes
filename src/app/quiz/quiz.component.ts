import { Component, OnInit } from '@angular/core';

import { Character } from '../core/character.model';
import { Logger } from '../core/logger.service';
import { QuestionModel } from './question.model';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  hero: Character;
  questions: QuestionModel[] = [];

  constructor(private logger: Logger, private quizService: QuizService) {}

  ngOnInit() {
    this.questions = this.quizService.getQuestions();
  }

  resetQuiz() {
    this.hero = undefined;
  }

  submit() {
    const notCompleted: QuestionModel = this.questions.find(question => question.answer === null);
    if (notCompleted) {
      this.logger.warning('A true hero must be honest..Answer all questions!', null, 'Quiz');
    } else {
      this.quizService.getHero().then(hero => {
        this.questions.forEach(question => {
          question.answer = null;
        });
        this.hero = hero;
      });
    }
  }
}
