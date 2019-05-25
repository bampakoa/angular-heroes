import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Character } from '../core/character.model';
import { ContextService } from '../core/core.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private http: HttpClient, private contextService: ContextService) {}

  getCharacters(term: string): Observable<Character[]> {
    const options = new HttpParams().set('nameStartsWith', term);
    return this.http
      .get<Character[]>(`${environment.apiUrl}characters`, {params: options})
      .pipe(
        map((response: any) => response.data.results),
        catchError(this.contextService.handleError)
      );
  }
}
