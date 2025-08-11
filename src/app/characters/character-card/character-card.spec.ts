import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CharacterCard } from './character-card';
import { character } from '../../../testing/mock-data';

describe('CharacterCard', () => {
  let component: CharacterCard;
  let fixture: ComponentFixture<CharacterCard>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    });
    fixture = TestBed.createComponent(CharacterCard, {
      bindings: [inputBinding('character', signal(character))]
    });
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should display the name', () => {
    const nameDisplay: HTMLElement = fixture.nativeElement.querySelector('h3');
    expect(nameDisplay.textContent).toEqual(component.character().name);
  });
});
