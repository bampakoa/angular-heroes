import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
  template: '<app-comic-list [character]="character"></app-comic-list>'
})
class TestHostComponent {
  character = { id: 1 } as Character;
}

@Component({ selector: 'app-comic-detail', template: '' })
class ComicDetailStubComponent {
  @Input() comic: Comic | undefined;
}

describe(ComicListComponent.name, () => {
  let component: ComicListComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let comicServiceSpy: jasmine.SpyObj<ComicService>;

  beforeEach(() => {
    comicServiceSpy = jasmine.createSpyObj('ComicService', ['getComics']);
    comicServiceSpy.getComics.and.returnValue(of(fakeComics));

    TestBed.configureTestingModule({
      imports: [
        MatGridListModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        ComicDetailStubComponent,
        ComicListComponent,
        TestHostComponent
      ],
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
    component.showProgress = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).not.toBeNull();
  });
});
