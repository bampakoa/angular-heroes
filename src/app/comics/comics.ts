import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { Comic } from './comic';
import { environment } from '../../environments/environment';
import { Marvel } from '../models/marvel';

@Injectable({
  providedIn: 'root'
})
export class Comics {
  private http = inject(HttpClient);

  getAll(characterId: number) {
    return this.http.get<Marvel<Comic>>(`${environment.apiUrl}characters/${characterId}/comics`).pipe(
      map(response => response.data.results)
    );
  }
}
