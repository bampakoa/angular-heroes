import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { fakeMarvelResponseData } from '../../../testing/mock-data';
import { Characters } from '../characters';
import { CharacterList } from './character-list';

describe('CharacterList', () => {
  let component: CharacterList;
  let fixture: ComponentFixture<CharacterList>;
  let characterServiceSpy: jasmine.SpyObj<Characters>;

  beforeEach(async () => {
    characterServiceSpy = jasmine.createSpyObj('Characters', ['getAll']);
    characterServiceSpy.getAll.and.returnValue(of(fakeMarvelResponseData));

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: Characters, useValue: characterServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(CharacterList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search', () => {
    const spy = spyOn(component, 'search');
    const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
    searchInput.dispatchEvent(new Event('keyup'));
    expect(spy.calls.any()).toBeTrue();
  });
});
