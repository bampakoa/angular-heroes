import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EMPTY } from 'rxjs';

import { character } from '../../../testing/mock-data';
import { Comics } from '../comics';
import { ComicList } from './comic-list';

describe('ComicList', () => {
  let component: ComicList;
  let fixture: ComponentFixture<ComicList>;
  let comicServiceSpy: jasmine.SpyObj<Comics>;

  beforeEach(async () => {
    comicServiceSpy = jasmine.createSpyObj('Comics', ['getAll']);
    comicServiceSpy.getAll.and.returnValue(EMPTY);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: Comics, useValue: comicServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ComicList, {
      bindings: [inputBinding('character', signal(character))]
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
