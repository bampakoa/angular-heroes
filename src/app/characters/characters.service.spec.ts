import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { Character } from '../core/character.model';
import { ContextService } from '../core/core.service';
import { CharacterService, MarvelResponse } from './characters.service';

const fakeMarvelResponseData = {
  results: [{ name: 'Fake character' }] as Character[],
  count: 1,
  offset: 0,
  limit: 20,
  total: 1,
} as MarvelResponse['data'];

describe(CharacterService.name, () => {
  let service: CharacterService;
  let httpTestingController: HttpTestingController;
  let contextServiceSpy: jasmine.SpyObj<ContextService>;
  const url = environment.apiUrl + 'characters';

  const buildCharactersUrl = (term: string, offset = 0, limit = 20) => {
    return url + `?nameStartsWith=${term}&offset=${offset}&limit=${limit}`;
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

  it('should get characters with offset and limit', () => {
    const offset = 10;
    const limit = 40;
    service.getCharacters('fakename', offset, limit).subscribe();
    const req = httpTestingController.expectOne(buildCharactersUrl('fakename', offset, limit));
    req.flush({
      data: fakeMarvelResponseData
    });
    expect(req.request.params.get('offset')).toEqual(`${offset}`);
    expect(req.request.params.get('limit')).toEqual(`${limit}`);
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
