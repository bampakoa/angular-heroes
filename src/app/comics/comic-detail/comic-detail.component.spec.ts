import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextService } from '../../core/core.service';
import { Comic } from '../comic.model';
import { ComicDetailComponent } from './comic-detail.component';

const fakeComic: Partial<Comic> = {
  id: 1,
  digitalId: 1,
  thumbnail: {
    path: 'Fake path',
    extension: 'fake'
  }
};

@Component({
  template: '<app-comic-detail [comic]="comic" />',
  imports: [ComicDetailComponent]
})
class TestHostComponent {
  comic = fakeComic;
}

describe('ComicDetailComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let contextServiceSpy: jasmine.SpyObj<ContextService>;

  beforeEach(async () => {
    contextServiceSpy = jasmine.createSpyObj('ContextService', ['getImage']);
    contextServiceSpy.getImage.and.returnValue('http://fakeimage/');

    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: ContextService, useValue: contextServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
  });

  it('should display link', () => {
    const linkDisplay: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(linkDisplay.href).toBe('https://read.marvel.com/#/book/1');
  });

  it('should display image', () => {
    const imageDisplay: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imageDisplay.src).toEqual('http://fakeimage/');
  });
});
