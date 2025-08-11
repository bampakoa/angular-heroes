import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Characters } from './characters';
import { environment } from '../../environments/environment';
import { character, fakeMarvelResponseData } from '../../testing/mock-data';

describe('Characters', () => {
  let service: Characters;
  let httpTestingController: HttpTestingController;
  const url = `${environment.apiUrl}characters?nameStartsWith=fakename&limit=${environment.charactersLimit}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(Characters);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all', done => {
    service.getAll('fakename').subscribe(characters => {
      expect(characters).toEqual(fakeMarvelResponseData);
      done();
    });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush({ data: fakeMarvelResponseData });
  });

  it('should get single', done => {
    service.getSingle(1).subscribe(data => {
      expect(data).toEqual(character);
      done();
    });
    const req = httpTestingController.expectOne(environment.apiUrl + 'characters/1');
    expect(req.request.method).toEqual('GET');
    req.flush({ data: fakeMarvelResponseData });
  });

  afterEach(() => httpTestingController.verify());
});
