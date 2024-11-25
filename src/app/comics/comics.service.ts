import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map } from 'rxjs';

import { APP_CONFIG } from '../app.config';
import { Comic } from './comic.model';
import { ContextService } from '../core/core.service';
import { MarvelResponse } from '../core/marvel-response.model';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  private http = inject(HttpClient);
  private contextService = inject(ContextService);
  private config = inject(APP_CONFIG);

  getComics(characterId: number) {
    return this.http.get<MarvelResponse<Comic>>(`${this.config.apiUrl}characters/${characterId}/comics`).pipe(
      map(response => response.data.results),
      catchError(this.contextService.handleError)
    );
  }
}
