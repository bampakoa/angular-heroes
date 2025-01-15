import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterLink } from '@angular/router';

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
        provideExperimentalZonelessChangeDetection(),
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

  it('should have a RouterLink', () => {
    const linkDe = fixture.debugElement.query(By.directive(RouterLink));
    const routerLink = linkDe.injector.get(RouterLink);
    expect(routerLink.href).toBe('/1');
  });
});
