import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Character } from './character.model';
import { LoadingService } from '../core/loading.service';
import { environment } from '../../environments/environment';

@Injectable()
export class CharactersService {
  private charactersUrl: string;

  constructor(private http: Http, private loadingService: LoadingService) {
    this.charactersUrl = `${environment.apiEndpoint}characters`;
  }

  getCharacters(term: string): Observable<Character[]> {
    this.loadingService.show();

    return this.http.get(`${this.charactersUrl}`, { params: { apikey: environment.apiKey, nameStartsWith: term } })
                .map((r: Response) => r.json().data.results)
                .finally(() => this.loadingService.hide());
  }

  getCharacterDetailsUrl(character: Character): string {
    const detail = character.urls.find(url => url.type === 'detail');
    return detail ? detail.url : 'http://marvel.com';
  }

}
