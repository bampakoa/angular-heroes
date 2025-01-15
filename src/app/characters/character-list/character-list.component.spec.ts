import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { fakeMarvelResponseData } from '../../../testing/mock-data';
import { CharacterService } from '../characters.service';
import { CharacterListComponent } from './character-list.component';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let characterServiceSpy: jasmine.SpyObj<CharacterService>;
  let snackbarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    
    characterServiceSpy = jasmine.createSpyObj('CharacterService', ['getAll']);
    characterServiceSpy.getAll.and.returnValue(of(fakeMarvelResponseData));

    TestBed.configureTestingModule({
      imports: [CharacterListComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideNoopAnimations(),
        provideRouter([]),
        { provide: CharacterService, useValue: characterServiceSpy },
        { provide: MatSnackBar, useValue: snackbarSpy }
      ]
    });
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search', () => {
    const spy = spyOn(component, 'search');
    const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
    searchInput.dispatchEvent(new CustomEvent('keyup'));
    expect(spy.calls.any()).toBeTrue();
  });

  it('should display characters', (done: DoneFn) => {
    component.characters$.subscribe(async () => {
      await fixture.whenStable();
      const cardsDisplay = fixture.nativeElement.querySelectorAll('app-character-card');
      expect(cardsDisplay.length).toBe(1);
      done();
    });
    component.search('123');
  });
});
