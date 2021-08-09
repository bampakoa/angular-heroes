import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ContextService } from '../core/core.service';
import { MarvelResponse } from '../core/marvel-response.model';
import { Comic } from './comic.model';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  constructor(private http: HttpClient, private contextService: ContextService) {}

  getComics(characterId: number): Observable<Comic[]> {
    return this.http.get<MarvelResponse<Comic>>(`${environment.apiUrl}characters/${characterId}/comics`).pipe(
      map(response => response.data.results),
      catchError(this.contextService.handleError)
    );
  }

}
