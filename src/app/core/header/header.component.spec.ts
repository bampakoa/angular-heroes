import { ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { HeaderComponent } from './header.component';
import { MaterialModule } from '../material.module';

describe(HeaderComponent.name, () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [HeaderComponent]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const titleDisplay: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(titleDisplay.textContent).toEqual(environment.settings.appTitle);
  });
});
