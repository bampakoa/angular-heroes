import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Character } from '../core/character.model';
import { ContextService } from '../core/core.service';
import { MarvelResponse, MarvelResponseData } from '../core/marvel-response.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient, private contextService: ContextService) {}

  getCharacters(term: string): Observable<MarvelResponseData<Character>> {
    const options = new HttpParams()
      .set('nameStartsWith', term)
      .set('limit', `${environment.settings.charactersLimit}`);

    return this.http.get<MarvelResponse<Character>>(`${environment.apiUrl}characters`, { params: options }).pipe(
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
