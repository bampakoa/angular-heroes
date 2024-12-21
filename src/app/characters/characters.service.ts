import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map } from 'rxjs';

import { environment } from '../../environments/environment';
import { Character } from '../core/character.model';
import { ContextService } from '../core/core.service';
import { MarvelResponse } from '../core/marvel-response.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private http = inject(HttpClient);
  private contextService = inject(ContextService);

  getAll(term: string) {
    const options = new HttpParams()
      .set('nameStartsWith', term)
      .set('limit', environment.charactersLimit);

    return this.http.get<MarvelResponse<Character>>(environment.apiUrl + 'characters', { params: options }).pipe(
      map(response => {
        if (!this.contextService.copyright) {
          this.contextService.copyright = response.attributionText;
        }
        return response.data;
      }),
      catchError(this.contextService.handleError)
    );
  }

  getSingle(id: number) {
    return this.http.get<MarvelResponse<Character>>(`${environment.apiUrl}characters/${id}`).pipe(
      map(response => response.data.results[0])
    );
  }
}
