import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDrawer } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { Sidebar } from './sidebar';
import { character } from '../../../testing/mock-data';

@Component({
  template: `
    <mat-drawer>
      <router-outlet />
    </mat-drawer>
  `,
  imports: [Sidebar, MatDrawer, RouterOutlet]
})
class TestHost { }

describe('Sidebar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([{
          path: '',
          component: TestHost,
          children: [ 
            {
              path: ':id',
              component: Sidebar,
              resolve: {
                character: () => of(character)
              }
            }
          ]
        }])
      ]
    })
  });

  it('should navigate', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/1');
    const component = harness.routeDebugElement?.query(By.directive(Sidebar)).componentInstance;
    expect(component.tab().selectedIndex).toBe(0);
    expect(component.character).toEqual(character);
  });
});
