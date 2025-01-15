import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ContextService } from './core.service';
import { loadingInterceptor } from './loading.interceptor';

describe('loadingInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => loadingInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideHttpClient(withInterceptors([loadingInterceptor])),
        provideHttpClientTesting()
      ]
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should set progress', () => {
    const contextService = TestBed.inject(ContextService);
    contextService.showProgress.set(true);
    
    TestBed.inject(HttpClient).get('/test').subscribe();
    const req = TestBed.inject(HttpTestingController).expectOne('/test');
    req.flush('');
    
    expect(contextService.showProgress()).toBeFalse();
  });
});
