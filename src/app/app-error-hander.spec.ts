import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppErrorHandler } from './app-error-handler';

describe('AppErrorHandler', () => {
  let service: AppErrorHandler;
  let snackbarSpy: jasmine.SpyObj<MatSnackBar>;
  let consoleSpy: jasmine.Spy;

  beforeEach(() => {
    snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    consoleSpy = spyOn(console, 'log');

    TestBed.configureTestingModule({
      providers: [
        AppErrorHandler,
        { provide: MatSnackBar, useValue: snackbarSpy }
      ]
    });

    service = TestBed.inject(AppErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle an error', () => {
    const error = { message: 'Fake error' } as Error;
    service.handleError(error);
    expect(snackbarSpy.open).toHaveBeenCalledWith('Fake error');
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});
