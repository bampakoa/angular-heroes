import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { Comic } from './comic.model';
import { ContextService } from '../core/core.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ComicService {

  constructor(private http: HttpClient, private contextService: ContextService) {}

  getComics(characterId: number): Promise<Comic[]> {
      return this.http
        .get<Comic[]>(`${environment.apiUrl}characters/${characterId}/comics`)
        .pipe(
          map((response: any) => response.data.results),
          catchError(this.contextService.handleError)
        )
        .toPromise();
  }

}
