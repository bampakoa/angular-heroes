import { Component, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { AppMaterialModule } from '../../app-material.module';
import { Character } from '../../core/character.model';
import { CharacterService, MarvelResponse } from '../characters.service';
import { CharacterListComponent } from './character-list.component';

let fixture: ComponentFixture<CharacterListComponent>;

@Component({ selector: 'app-character-detail', template: '' })
class CharacterDetailStubComponent {
  @Input() character;
}

@Component({ selector: 'app-character-card', template: '' })
class CharacterCardStubComponent {
  @Input() character;
}

@Component({ selector: 'app-comic-list', template: '' })
class ComicListStubComponent {
  @Input() character;
}

const fakeMarvelResponseData = {
  results: [{
    id: 1,
    name: 'Fake character',
    description: 'My fake super hero',
    thumbnail: {
      path: 'Fake path',
      extension: 'fake'
    },
    urls: [{ url: 'http://fakeurl/', type: 'fakeType' }]
  }] as Character[],
  count: 1,
  offset: 0,
  limit: 20,
  total: 1,
} as MarvelResponse['data'];

function search() {
  const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
  searchInput.value = 'Fake character';

  const evt = document.createEvent('CustomEvent');
  evt.initCustomEvent('keyup', false, false, null);

  const keyupEvent: any = evt;
  keyupEvent.key = 'Fake';
  searchInput.dispatchEvent(keyupEvent);
}

describe(CharacterListComponent.name, () => {
  let component: CharacterListComponent;
  let characterServiceSpy: jasmine.SpyObj<CharacterService>;
  let snackbarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    characterServiceSpy = jasmine.createSpyObj('CharacterService', ['getCharacters']);
    snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        NoopAnimationsModule
      ],
      declarations: [
        CharacterCardStubComponent,
        CharacterDetailStubComponent,
        CharacterListComponent,
        ComicListStubComponent
      ],
      providers: [
        { provide: CharacterService, useValue: characterServiceSpy },
        { provide: MatSnackBar, useValue: snackbarSpy }
      ]
    });
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return characters', fakeAsync(() => {
    characterServiceSpy.getCharacters.and.returnValue(of(fakeMarvelResponseData));
    search();
    tick(300);
    fixture.detectChanges();
    const cardDisplay: HTMLElement[] = fixture.nativeElement.querySelectorAll('app-character-card');
    expect(cardDisplay.length).toBe(1);
  }));

  it('should not return characters', fakeAsync(() => {
    characterServiceSpy.getCharacters.and.returnValue(throwError(''));
    search();
    tick(300);
    fixture.detectChanges();
    const cardDisplay: HTMLElement[] = fixture.nativeElement.querySelectorAll('app-character-card');
    expect(cardDisplay.length).toBe(0);
  }));

  it('should select a character', async () => {
    component.characters$ = of(fakeMarvelResponseData.results);
    fixture.detectChanges();
    const cardDisplay = fixture.debugElement.query(By.css('app-character-card'));
    cardDisplay.triggerEventHandler('selectedChange', fakeMarvelResponseData.results[0]);
    expect(component.selectedCharacter).toEqual(fakeMarvelResponseData.results[0]);
  });

  it('should display progress bar', () => {
    component.showProgress = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-progress-bar')).not.toBeNull();
  });

  it('should display warning message', fakeAsync(() => {
    characterServiceSpy.getCharacters.and.returnValue(of({ ...fakeMarvelResponseData, total: component.CHARACTERS_LIMIT + 1 }));
    search();
    tick(300);
    fixture.detectChanges();
    expect(snackbarSpy.open.calls.first().args[0]).toContain('There are more results');
  }));
});
