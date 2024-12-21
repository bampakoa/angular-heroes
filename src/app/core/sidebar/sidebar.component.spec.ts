import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDrawer } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SidebarComponent } from './sidebar.component';
import { character } from '../../../testing/mock-data';

@Component({
  template: `
    <mat-drawer>
      <router-outlet />
    </mat-drawer>
  `,
  imports: [SidebarComponent, MatDrawer, RouterOutlet]
})
class TestHostComponent { }

describe('SidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([{
          path: '',
          component: TestHostComponent,
          children: [ 
            {
              path: ':id',
              component: SidebarComponent,
              resolve: {
                character: () => of(character)
              }
            }
          ]
        }]),
        provideNoopAnimations()
      ]
    })
      .compileComponents();
  });

  it('should navigate', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/1');
    const component = harness.routeDebugElement?.query(By.directive(SidebarComponent)).componentInstance;
    expect(component.tab()!.selectedIndex).toBe(0);
    expect(component.character).toEqual(character);
  });
});
