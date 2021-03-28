import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ContextService } from './core.service';
import { Thumbnail } from './thumbnail.model';

describe(ContextService.name, () => {
  let service: ContextService;
  let snackbarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
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
    expect(snackbarSpy.open.calls.first().args[0]).toContain(environment.settings.appErrorPrefix);
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
