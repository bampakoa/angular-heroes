import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Characters } from '../characters';
import { CharacterList } from './character-list';

describe('CharacterList', () => {
  let component: CharacterList;
  let fixture: ComponentFixture<CharacterList>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: Characters, useValue: {} }
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
