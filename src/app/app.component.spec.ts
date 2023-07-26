import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

@Component({ selector: 'app-header', template: '' })
class HeaderStubComponent {}

@Component({ selector: 'app-footer', template: '' })
class FooterStubComponent {}

@Component({ selector: 'app-character-list', template: '' })
class CharacterListStubComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderStubComponent,
        FooterStubComponent,
        CharacterListStubComponent
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
