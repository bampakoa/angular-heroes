import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map } from 'rxjs';

import { APP_CONFIG } from '../app.config';
import { Character } from '../core/character.model';
import { ContextService } from '../core/core.service';
import { MarvelResponse } from '../core/marvel-response.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private http = inject(HttpClient);
  private contextService = inject(ContextService);
  private config = inject(APP_CONFIG);

  getCharacters(term: string) {
    const options = new HttpParams()
      .set('nameStartsWith', term)
      .set('limit', `${this.config.charactersLimit}`);

    return this.http.get<MarvelResponse<Character>>(`${this.config.apiUrl}characters`, { params: options }).pipe(
      map(response => {
        if (!this.contextService.copyright) {
          this.contextService.copyright = response.attributionText;
        }
        return response.data;
      }),
      catchError(this.contextService.handleError)
    );
  }
}
