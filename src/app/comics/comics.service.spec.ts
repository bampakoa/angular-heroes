import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Comic } from './comic.model';
import { ComicService } from './comics.service';
import { environment } from '../../environments/environment';
import { ContextService } from '../core/core.service';

const fakeComics = [{ id: 1 }] as Comic[];

describe('ComicService', () => {
  let service: ComicService;
  let httpTestingController: HttpTestingController;
  let contextServiceSpy: jasmine.SpyObj<ContextService>;

  beforeEach(() => {
    contextServiceSpy = jasmine.createSpyObj('ContextService', ['handleError']);

    TestBed.configureTestingModule({
      providers: [
        ComicService,
        { provide: ContextService, useValue: contextServiceSpy },
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ComicService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get comics', () => {
    service.getAll(1).subscribe(comics => expect(comics).toEqual(fakeComics));
    const req = httpTestingController.expectOne(environment.apiUrl + 'characters/1/comics');
    expect(req.request.method).toEqual('GET');
    req.flush({
      data: { results: fakeComics }
    });
  });

  afterEach(() => httpTestingController.verify());
});
