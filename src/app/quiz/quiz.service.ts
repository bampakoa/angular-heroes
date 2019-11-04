import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Character } from '../core/character.model';
import { ContextService } from '../core/core.service';
import { QuestionModel } from './question.model';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient, private contextService: ContextService) {}

  getHero(questions: QuestionModel[]): Observable<Character> {
    const ranking: {[key: string]: number} = {};

    questions.forEach(question => {
      this.match((question.answer === 'yes') ? question.positive : question.negative, ranking);
    });

    const heroId = Object.keys(ranking).reduce((a: string, b: string) => ranking[a] > ranking[b] ? a : b);

    return this.http
      .get<Character>(`${environment.apiUrl}characters/${heroId}`)
      .pipe(
        map((response: any) => response.data.results[0]),
        catchError(this.contextService.handleError)
      );
  }

  getQuestions(): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>('assets/questions.json');
  }

  private match(arr: string[], data: {[key: string]: number}) {
    arr.forEach(name => {
      if (!data[name]) {
        data[name] = 100 / arr.length;
      } else {
        data[name] += 100 / arr.length;
      }
    });
  }
}
