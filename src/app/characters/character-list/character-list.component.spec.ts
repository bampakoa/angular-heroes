import { Component, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Character } from '../../core/character.model';
import { MarvelResponseData } from '../../core/marvel-response.model';
import { CharacterService } from '../characters.service';
import { CharacterListComponent } from './character-list.component';

let fixture: ComponentFixture<CharacterListComponent>;

@Component({ selector: 'app-character-detail', template: '' })
class CharacterDetailStubComponent {
  @Input() character: Character | undefined;
}

@Component({ selector: 'app-character-card', template: '' })
class CharacterCardStubComponent {
  @Input() character: Character | undefined;
}

@Component({ selector: 'app-comic-list', template: '' })
class ComicListStubComponent {
  @Input() character: Character | undefined;
}

const fakeMarvelResponseData: MarvelResponseData<Character> = {
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
  total: 1
};

function search() {
  const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
  searchInput.value = 'Fake character';
  searchInput.dispatchEvent(new CustomEvent('keyup'));
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
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatTabsModule,
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
    characterServiceSpy.getCharacters.and.returnValue(of({
      ...fakeMarvelResponseData,
      total: environment.settings.charactersLimit + 1
    }));
    search();
    tick(300);
    fixture.detectChanges();
    expect(snackbarSpy.open).toHaveBeenCalled();
  }));
});
