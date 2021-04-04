import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { Character } from '../core/character.model';
import { ContextService } from '../core/core.service';
import { CharacterService } from './characters.service';

const fakeCharacters = [{ name: 'Fake character' }] as Character[];

describe(CharacterService.name, () => {
  let service: CharacterService;
  let httpTestingController: HttpTestingController;
  let contextServiceSpy: jasmine.SpyObj<ContextService>;
  const url = environment.apiUrl + 'characters';

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
    service.getCharacters('fakename').subscribe(characters => expect(characters).toEqual(fakeCharacters));
    const req = httpTestingController.expectOne(url + '?nameStartsWith=fakename');
    expect(req.request.method).toEqual('GET');
    req.flush({
      data: { results: fakeCharacters }
    });
  });

  it('should set copyright', () => {
    service.getCharacters('fakename').subscribe();
    const req = httpTestingController.expectOne(url + '?nameStartsWith=fakename');
    req.flush({
      attributionText: 'fakeAttribution',
      data: { results: fakeCharacters }
    });
    expect(contextServiceSpy.copyright).toEqual('fakeAttribution');
  });

  afterEach(() => httpTestingController.verify());
});
