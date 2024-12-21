import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map } from 'rxjs';

import { Comic } from './comic.model';
import { environment } from '../../environments/environment';
import { ContextService } from '../core/core.service';
import { MarvelResponse } from '../core/marvel-response.model';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  private http = inject(HttpClient);
  private contextService = inject(ContextService);

  getAll(characterId: number) {
    return this.http.get<MarvelResponse<Comic>>(`${environment.apiUrl}characters/${characterId}/comics`).pipe(
      map(response => response.data.results),
      catchError(this.contextService.handleError)
    );
  }
}
