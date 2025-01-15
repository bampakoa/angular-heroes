import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardHarness } from '@angular/material/card/testing';
import { By } from '@angular/platform-browser';

import { CharacterDetailComponent } from './character-detail.component';
import { character } from '../../../testing/mock-data';
import { ContextService } from '../../core/core.service';

@Component({
  template: '<app-character-detail [character]="character" />',
  imports: [CharacterDetailComponent]
})
class TestHostComponent {
  character = character;
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
      imports: [TestHostComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: ContextService, useValue: contextServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.query(By.directive(CharacterDetailComponent)).componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

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
    expect(await cardDisplay.getTitleText()).toBe(character.name);
  });

  it('should display id', async () => {
    expect(await cardDisplay.getSubtitleText()).toBe(character.id.toString());
  });

  it('should display image', () => {
    expect(imageDisplay[1].src).toEqual('http://fakeimage/');
  });

  it('should display description', () => {
    const descrDisplay: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(descrDisplay.textContent).toContain(character.description);
  });

  it('should display character URLs', () => {
    const links: HTMLAnchorElement[] = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(1);
  });

  it('should get avatar', () => {
    component.getAvatar();
    expect(contextServiceSpy.getImage).toHaveBeenCalledWith('standard_medium', character.thumbnail);
  });

  it('should get image', () => {
    component.getAvatar();
    expect(contextServiceSpy.getImage).toHaveBeenCalledWith('portrait_uncanny', character.thumbnail);
  });
});
