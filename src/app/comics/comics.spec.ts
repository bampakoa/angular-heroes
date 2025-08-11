import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Comic } from './comic';
import { Comics } from './comics';
import { environment } from '../../environments/environment';

describe('Comics', () => {
  let service: Comics;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(Comics);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get comics', done => {
    const fakeComics = [{ id: 1 }] as Comic[];
    service.getAll(1).subscribe(comics => {
      expect(comics).toEqual(fakeComics);
      done();
    });
    const req = httpTestingController.expectOne(environment.apiUrl + 'characters/1/comics');
    expect(req.request.method).toEqual('GET');
    req.flush({
      data: { results: fakeComics }
    })
    httpTestingController.verify();
  });
});
