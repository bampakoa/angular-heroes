import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ContextService } from '../core/core.service';
import { Comic } from './comic.model';

@Injectable()
export class ComicService {
  constructor(private http: HttpClient, private contextService: ContextService) {}

  getComics(characterId: number): Observable<Comic[]> {
    return this.http
      .get<Comic[]>(`${environment.apiUrl}characters/${characterId}/comics`)
      .pipe(
        map((response: any) => response.data.results),
        catchError(this.contextService.handleError)
      );
  }
}
