import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { Character } from '../../core/character.model';
import { ContextService } from '../../core/core.service';
import { CharacterCardComponent } from './character-card.component';

@Component({
  template: '<app-character-card [character]="character" (selectedChange)="selected = $event"></app-character-card>'
})
class TestHostComponent {
  character = {
    name: 'Fake character',
    thumbnail: {
      path: 'Fake path',
      extension: 'fake'
    }
  } as Character;
  selected: Character | undefined;
}

describe(CharacterCardComponent.name, () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let contextServiceSpy: jasmine.SpyObj<ContextService>;

  beforeEach(() => {
    contextServiceSpy = jasmine.createSpyObj('ContextService', ['getImage']);
    contextServiceSpy.getImage.and.returnValue('http://fakeimage');

    TestBed.configureTestingModule({
      imports: [
        MatGridListModule,
        MatIconModule
      ],
      declarations: [
        CharacterCardComponent,
        TestHostComponent
      ],
      providers: [
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

  it('should select a character', () => {
    const selectButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    selectButton.click();
    expect(component.selected).toEqual(component.character as Character);
  });
});
