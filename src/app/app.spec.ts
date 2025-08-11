import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { App } from './app';
import { ContextService } from './core/core.service';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  const contextServiceStub: Partial<ContextService> = {
    showProgress: signal(true)
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations(),
        provideHttpClient(),
        { provide: ContextService, useValue: contextServiceStub }
      ]
    });
    fixture = TestBed.createComponent(App);
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
