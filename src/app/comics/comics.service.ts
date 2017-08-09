import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Comic } from './comic.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ComicsService {
  private comicsUrl: string;

  constructor(private http: Http) { }

  getComics(characterId: number): Promise<Comic[]> {
    this.comicsUrl = `${environment.apiEndpoint}characters/${characterId}/comics`;

    return this.http.get(this.comicsUrl, { params: { apikey: environment.apiKey } })
                    .toPromise()
                    .then((r: Response) => r.json().data.results);
  }

}
