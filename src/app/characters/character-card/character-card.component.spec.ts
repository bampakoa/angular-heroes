import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CharacterCardComponent } from './character-card.component';
import { character } from '../../../testing/mock-data';
import { ContextService } from '../../core/core.service';

@Component({
  template: '<app-character-card [character]="character" />',
  imports: [CharacterCardComponent]
})
class TestHostComponent {
  character = character;
}

describe('CharacterCardComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let contextServiceSpy: jasmine.SpyObj<ContextService>;

  beforeEach(() => {
    contextServiceSpy = jasmine.createSpyObj('ContextService', ['getImage']);
    contextServiceSpy.getImage.and.returnValue('http://fakeimage');

    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideRouter([]),
        { provide: ContextService, useValue: contextServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should display character image', () => {
    const imageDisplay: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imageDisplay.src).toBe('http://fakeimage/');
    expect(imageDisplay.alt).toContain(component.character.name);
  });

  it('should display character name', () => {
    const nameDisplay: HTMLElement = fixture.nativeElement.querySelector('h3');
    expect(nameDisplay.textContent).toEqual(component.character.name);
  });
});
