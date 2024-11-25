import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

import { APP_CONFIG, AppConfig } from '../app.config';
import { Comic } from './comic.model';
import { ContextService } from '../core/core.service';
import { MarvelResponse } from '../core/marvel-response.model';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  constructor(private http: HttpClient, private contextService: ContextService, @Inject(APP_CONFIG) private config: AppConfig) {}

  getComics(characterId: number): Observable<Comic[]> {
    return this.http.get<MarvelResponse<Comic>>(`${this.config.apiUrl}characters/${characterId}/comics`).pipe(
      map(response => response.data.results),
      catchError(this.contextService.handleError)
    );
  }

}
