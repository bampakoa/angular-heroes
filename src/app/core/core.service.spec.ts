import { HttpErrorResponse } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY } from 'rxjs';

import { ContextService } from './core.service';
import { Thumbnail } from './thumbnail.model';

describe('ContextService', () => {
  let service: ContextService;
  let snackbarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        ContextService,
        { provide: MatSnackBar, useValue: snackbarSpy }
      ]
    });

    service = TestBed.inject(ContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get image', () => {
    const fakeThumbnail: Thumbnail = {
      path: 'fakePath',
      extension: 'fake'
    };
    expect(service.getImage('fakeVariant', fakeThumbnail)).toBe('fakePath/fakeVariant.fake');
  });

  it('should throw an error', () => {
    const error = {
      error: new ErrorEvent('Fake error')
    } as HttpErrorResponse;
    expect(() => service.handleError(error)).toThrow();
  });

  it('should display an error', () => {
    const error = {
      error: 'Fake error'
    } as HttpErrorResponse;
    service.handleError(error);
    expect(snackbarSpy.open.calls.any()).toBeTrue();
  });

  it('should return an error', () => {
    const error = {
      error: 'Fake error'
    } as HttpErrorResponse;
    service.handleError(error).pipe(
      catchError(err => {
        expect(err).toEqual(error);
        return EMPTY;
      })
    ).subscribe();
  });
});
