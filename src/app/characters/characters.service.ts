import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Character } from '../core/character.model';
import { ContextService } from '../core/core.service';

export interface MarvelResponse {
  attributionText: string;
  data: {
    results: Character[],
    total: number,
  };
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient, private contextService: ContextService) {}

  getCharacters(term: string, offset = 0, limit = 20): Observable<MarvelResponse['data']> {
    const options = new HttpParams()
      .set('nameStartsWith', term)
      .set('offset', `${Math.max(offset, 0)}`)
      .set('limit', `${Math.max(limit, 1)}`);

    return this.http.get<MarvelResponse>(`${environment.apiUrl}characters`, { params: options }).pipe(
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
