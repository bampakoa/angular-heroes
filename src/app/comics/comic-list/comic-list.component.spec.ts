import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { Character } from '../../core/character.model';
import { Comic } from '../comic.model';
import { ComicService } from '../comics.service';
import { ComicListComponent } from './comic-list.component';

const fakeComics: Comic[] = [
  {
    id: 1,
    digitalId: 1,
    thumbnail: {
      path: 'Fake path',
      extension: 'fake'
    }
  },
  {
    id: 2,
    digitalId: 0,
    thumbnail: {
      path: 'Fake path',
      extension: 'fake'
    }
  }
];

@Component({
  template: '<app-comic-list [character]="character" />',
  standalone: true,
  imports: [ComicListComponent]
})
class TestHostComponent {
  character = { id: 1 } as Character;
}

describe('ComicListComponent', () => {
  let component: ComicListComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let comicServiceSpy: jasmine.SpyObj<ComicService>;

  beforeEach(() => {
    comicServiceSpy = jasmine.createSpyObj('ComicService', ['getComics']);
    comicServiceSpy.getComics.and.returnValue(of(fakeComics));

    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: ComicService, useValue: comicServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.query(By.directive(ComicListComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should display comics', () => {
    const comicDetailDisplay: HTMLElement[] = fixture.nativeElement.querySelectorAll('app-comic-detail');
    expect(comicDetailDisplay.length).toBe(1);
  });

  it('should display progress spinner', () => {
    component.showProgress.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).not.toBeNull();
  });
});
