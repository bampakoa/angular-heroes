import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { characterResolver } from './character.resolver';
import { CharacterService } from './characters.service';
import { character } from '../../testing/mock-data';
import { Character } from '../core/character.model';

describe('characterResolver', () => {
  const executeResolver: ResolveFn<Character> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => characterResolver(...resolverParameters));
  let characterServiceSpy: jasmine.SpyObj<CharacterService>;

  beforeEach(() => {
    characterServiceSpy = jasmine.createSpyObj('CharacterService', ['getSingle']);
    characterServiceSpy.getSingle.and.returnValue(of(character));

    TestBed.configureTestingModule({
      providers: [
        { provide: CharacterService, useValue: characterServiceSpy }
      ]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
  
  it('should return character', () => {
    const snapshot = new ActivatedRouteSnapshot();
    snapshot.params = { id: 1 };

    const character$ = executeResolver(snapshot, {} as RouterStateSnapshot) as Observable<Character>;
    character$.subscribe(data => expect(data).toEqual(character));
  });
});
