import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ContextService } from '../core.service';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;
  const contextServiceStub: Partial<ContextService> = {
    copyright: 'Fake copyright'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatToolbarModule],
      providers: [
        { provide: ContextService, useValue: contextServiceStub }
      ]
    });

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display copyright info', () => {
    const footerDisplay: HTMLElement = fixture.nativeElement.querySelector('small');
    expect(footerDisplay.textContent).toContain(contextServiceStub.copyright);
  });
});
