import { Component, OnInit } from '@angular/core';

import { Question } from '../question.model';
import { QuizService } from '../quiz.service';
import { Character } from '../../characters/character.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  hero: Character;
  questions: Question[];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.questions = this.quizService.getQuestions();
  }

  resetQuiz() {
    this.hero = undefined;
  }

  submit() {
    if (this.questions.find(question => !question.answer) !== undefined) {
      alert('You sneaky...A true hero must answer all the questions!');
    } else {
      this.quizService.getHero().then((hero: Character) => this.hero = hero);
    }
  }

}
