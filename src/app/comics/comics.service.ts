import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ContextService } from '../core/core.service';
import { Comic } from './comic.model';

interface MarvelResponse {
  data: {
    results: Comic[]
  };
}

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  constructor(private http: HttpClient, private contextService: ContextService) {}

  getComics(characterId: number): Observable<Comic[]> {
    return this.http.get<MarvelResponse>(`${environment.apiUrl}characters/${characterId}/comics`).pipe(
      map(response => response.data.results),
      catchError(this.contextService.handleError)
    );
  }

}
