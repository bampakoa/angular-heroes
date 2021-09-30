import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

import { environment } from '../../../environments/environment';
import { ContextService } from '../core.service';
import { FooterComponent } from './footer.component';

describe(FooterComponent.name, () => {
  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;
  const contextServiceStub: Partial<ContextService> = {
    copyright: 'Fake copyright'
  };
  let footerDisplay: HTMLElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatToolbarModule],
      declarations: [FooterComponent],
      providers: [
        { provide: ContextService, useValue: contextServiceStub }
      ]
    });

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    footerDisplay = fixture.nativeElement.querySelectorAll('small');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the version', () => {
    expect(footerDisplay[0].textContent).toContain(environment.settings.version);
  });

  it('should display copyright info', () => {
    expect(footerDisplay[1].textContent).toContain(contextServiceStub.copyright);
  });
});
