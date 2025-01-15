import { provideHttpClient } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ContextService } from './core/core.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  const contextServiceStub: Partial<ContextService> = {
    showProgress: signal(true)
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideNoopAnimations(),
        provideHttpClient(),
        { provide: ContextService, useValue: contextServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display progress bar', () => {
    expect(fixture.nativeElement.querySelector('mat-progress-bar')).not.toBeNull();
  });
});
