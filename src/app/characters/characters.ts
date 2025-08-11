import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../../environments/environment';
import { Character } from '../models/character';
import { Marvel } from '../models/marvel';

@Injectable({
  providedIn: 'root'
})
export class Characters {
  private http = inject(HttpClient);

  getAll(term: string) {
    const options = new HttpParams()
      .set('nameStartsWith', term)
      .set('limit', environment.charactersLimit);

    return this.http.get<Marvel<Character>>(environment.apiUrl + 'characters', { params: options }).pipe(
      map(response => response.data)
    );
  }

  getSingle(id: number) {
    return this.http.get<Marvel<Character>>(`${environment.apiUrl}characters/${id}`).pipe(
      map(response => response.data.results[0])
    );
  }
}
