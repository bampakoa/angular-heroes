import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Comic } from './comic.model';
import { AppConfig, appSettings } from '../../app/app.config';

@Injectable()
export class ComicsService {
  private comicsUrl: string;

  constructor(private http: Http, @Inject(appSettings) private config: AppConfig) { }

  getComics(characterId: number): Promise<Comic[]> {
    this.comicsUrl = `${this.config.apiEndpoint}characters/${characterId}/comics`;

    return this.http.get(this.comicsUrl, { params: { apikey: this.config.apiKey } })
                    .toPromise()
                    .then((r: Response) => r.json().data.results);
  }

}
