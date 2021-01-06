import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Character } from '../core/character.model';
import { ContextService } from '../core/core.service';

interface MarvelResponse {
  attributionText: string;
  data: {
    results: Character[]
  };
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient, private contextService: ContextService) {}

  getCharacters(term: string): Observable<Character[]> {
    const options = new HttpParams().set('nameStartsWith', term);

    return this.http.get<MarvelResponse>(`${environment.apiUrl}characters`, { params: options }).pipe(
      map((response: MarvelResponse) => {
        if (!this.contextService.copyright) {
          this.contextService.copyright = response.attributionText;
        }
        return response.data.results;
      }),
      catchError(this.contextService.handleError)
    );
  }

}
