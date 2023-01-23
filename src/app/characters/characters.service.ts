import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

import { APP_CONFIG, AppConfig } from '../app.config';
import { Character } from '../core/character.model';
import { ContextService } from '../core/core.service';
import { MarvelResponse, MarvelResponseData } from '../core/marvel-response.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient, private contextService: ContextService, @Inject(APP_CONFIG) private config: AppConfig) {}

  getCharacters(term: string): Observable<MarvelResponseData<Character>> {
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
