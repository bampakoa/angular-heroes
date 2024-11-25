import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatCardHarness } from '@angular/material/card/testing';
import { By } from '@angular/platform-browser';

import { CharacterDetailComponent } from './character-detail.component';
import { Character } from '../../core/character.model';
import { ContextService } from '../../core/core.service';

const fakeCharacter: Character = {
  id: 1,
  name: 'Fake character',
  description: 'My fake super hero',
  thumbnail: {
    path: 'Fake path',
    extension: 'fake'
  },
  urls: [{ url: 'http://fakeurl/', type: 'fakeType' }]
};

@Component({
  template: '<app-character-detail [character]="character"></app-character-detail>'
})
class TestHostComponent {
  character = fakeCharacter;
}

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let loader: HarnessLoader;
  let contextServiceSpy: jasmine.SpyObj<ContextService>;
  let imageDisplay: HTMLImageElement[];
  let cardDisplay: MatCardHarness;

  beforeEach(async () => {
    contextServiceSpy = jasmine.createSpyObj('ContextService', ['getImage']);
    contextServiceSpy.getImage.and.returnValue('http://fakeimage');

    TestBed.configureTestingModule({
      imports: [MatCardModule, NgOptimizedImage],
      declarations: [
        CharacterDetailComponent,
        TestHostComponent
      ],
      providers: [
        { provide: ContextService, useValue: contextServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.query(By.directive(CharacterDetailComponent)).componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();

    imageDisplay = fixture.nativeElement.querySelectorAll('img');
    cardDisplay = await loader.getHarness(MatCardHarness);
  });

  it('should display mat-card component', () => {
    expect(fixture.nativeElement.querySelector('mat-card')).not.toBeNull();
  });

  it('should display avatar', () => {
    expect(imageDisplay[0].src).toEqual('http://fakeimage/');
  });

  it('should display name', async () => {
    expect(await cardDisplay.getTitleText()).toBe(fakeCharacter.name);
  });

  it('should display id', async () => {
    expect(await cardDisplay.getSubtitleText()).toBe(fakeCharacter.id.toString());
  });

  it('should display image', () => {
    expect(imageDisplay[1].src).toEqual('http://fakeimage/');
  });

  it('should display description', () => {
    const descrDisplay: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(descrDisplay.textContent).toContain(fakeCharacter.description);
  });

  it('should display character URLs', () => {
    const links: HTMLAnchorElement[] = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(1);
  });

  it('should get avatar', () => {
    component.getAvatar();
    expect(contextServiceSpy.getImage).toHaveBeenCalledWith('standard_medium', fakeCharacter.thumbnail);
  });

  it('should get image', () => {
    component.getAvatar();
    expect(contextServiceSpy.getImage).toHaveBeenCalledWith('portrait_uncanny', fakeCharacter.thumbnail);
  });
});
