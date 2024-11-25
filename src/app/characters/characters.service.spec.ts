import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CharacterService } from './characters.service';
import { environment } from '../../environments/environment';
import { Character } from '../core/character.model';
import { ContextService } from '../core/core.service';
import { MarvelResponseData } from '../core/marvel-response.model';

const fakeMarvelResponseData: MarvelResponseData<Character> = {
  results: [{ name: 'Fake character' }] as Character[],
  total: 1
};

describe('CharacterService', () => {
  let service: CharacterService;
  let httpTestingController: HttpTestingController;
  let contextServiceSpy: jasmine.SpyObj<ContextService>;
  const url = `${environment.apiUrl}characters?nameStartsWith=fakename&limit=${environment.charactersLimit}`;

  beforeEach(() => {
    contextServiceSpy = jasmine.createSpyObj('ContextService', ['handleError']);

    TestBed.configureTestingModule({
      providers: [
        CharacterService,
        { provide: ContextService, useValue: contextServiceSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CharacterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get characters', () => {
    service.getCharacters('fakename').subscribe(characters => expect(characters).toEqual(fakeMarvelResponseData));
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush({
      data: fakeMarvelResponseData
    });
  });

  it('should set copyright', () => {
    service.getCharacters('fakename').subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush({
      attributionText: 'fakeAttribution',
      data: fakeMarvelResponseData
    });
    expect(contextServiceSpy.copyright).toEqual('fakeAttribution');
  });

  afterEach(() => httpTestingController.verify());
});
