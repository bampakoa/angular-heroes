import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { environment } from '../../../environments/environment';
import { HeaderComponent } from './header.component';

describe(HeaderComponent.name, () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatToolbarModule
      ],
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
