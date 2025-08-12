import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardHarness } from '@angular/material/card/testing';

import { CharacterDetail } from './character-detail';
import { character } from '../../../testing/mock-data';

describe('CharacterDetail', () => {
  let component: CharacterDetail;
  let fixture: ComponentFixture<CharacterDetail>;
  let loader: HarnessLoader;
  let cardDisplay: MatCardHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(CharacterDetail, {
      bindings: [inputBinding('character', signal(character))]
    });
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    cardDisplay = await loader.getHarness(MatCardHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name', async () => {
    expect(await cardDisplay.getTitleText()).toBe(character.name);
  });

  it('should display the id', async () => {
    expect(await cardDisplay.getSubtitleText()).toBe(character.id.toString());
  });

  it('should display the description', () => {
    const descrDisplay: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(descrDisplay.textContent).toContain(character.description);
  });

  it('should display the URL', () => {
    const link: HTMLElement = fixture.nativeElement.querySelector('a');
    expect(link.textContent).toBe('DETAIL');
  });
});
