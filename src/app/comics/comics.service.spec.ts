import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { appSettings, APP_CONFIG } from '../app.config';
import { Comic } from './comic.model';
import { ComicService } from './comics.service';
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
        { provide: APP_CONFIG, useValue: appSettings },
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
    service.getComics(1).subscribe(comics => expect(comics).toEqual(fakeComics));
    const req = httpTestingController.expectOne(appSettings.apiUrl + 'characters/1/comics');
    expect(req.request.method).toEqual('GET');
    req.flush({
      data: { results: fakeComics }
    });
  });

  afterEach(() => httpTestingController.verify());
});
