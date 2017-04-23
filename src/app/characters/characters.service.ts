import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Character } from './character.model';
import { LoadingService } from '../core/loading.service';
import { AppConfig, appSettings } from '../../app/app.config';

@Injectable()
export class CharactersService {
  private charactersUrl: string;

  constructor(private http: Http, @Inject(appSettings) private config: AppConfig, private loadingService: LoadingService) {
    this.charactersUrl = `${this.config.apiEndpoint}characters`;
  }

  getCharacters(term: string): Observable<Character[]> {
    this.loadingService.show();

    return this.http.get(`${this.charactersUrl}`, { params: { apikey: this.config.apiKey, nameStartsWith: term } })
                .map((r: Response) => r.json().data.results)
                .finally(() => this.loadingService.hide());
  }

  getCharacterDetailsUrl(character: Character): string {
    const detail = character.urls.find(url => url.type === 'detail');
    return detail ? detail.url : 'http://marvel.com';
  }

}
