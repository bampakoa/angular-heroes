import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { Character } from '../core/character.model';
import { ContextService } from '../core/core.service';
import { CharacterService, MarvelResponse } from './characters.service';

const fakeMarvelResponseData = {
  results: [{ name: 'Fake character' }] as Character[],
  total: 1
} as MarvelResponse['data'];

describe(CharacterService.name, () => {
  let service: CharacterService;
  let httpTestingController: HttpTestingController;
  let contextServiceSpy: jasmine.SpyObj<ContextService>;
  const url = environment.apiUrl + 'characters';

  const buildCharactersUrl = (term: string) => {
    return url + `?nameStartsWith=${term}&limit=${environment.settings.charactersLimit}`;
  };

  beforeEach(() => {
    contextServiceSpy = jasmine.createSpyObj('ContextService', ['handleError']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CharacterService,
        { provide: ContextService, useValue: contextServiceSpy }
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
    const req = httpTestingController.expectOne(buildCharactersUrl('fakename'));
    expect(req.request.method).toEqual('GET');
    req.flush({
      data: fakeMarvelResponseData
    });
  });

  it('should set copyright', () => {
    service.getCharacters('fakename').subscribe();
    const req = httpTestingController.expectOne(buildCharactersUrl('fakename'));
    req.flush({
      attributionText: 'fakeAttribution',
      data: fakeMarvelResponseData
    });
    expect(contextServiceSpy.copyright).toEqual('fakeAttribution');
  });

  afterEach(() => httpTestingController.verify());
});
