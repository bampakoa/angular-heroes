import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicDetail } from './comic-detail';

describe('ComicDetail', () => {
  let component: ComicDetail;
  let fixture: ComponentFixture<ComicDetail>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(ComicDetail, {
      bindings: [
        inputBinding('comic', signal({
          id: 1,
          digitalId: 1,
          thumbnail: {
            path: '',
            extension: ''
          }
        }))
      ]
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
