import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatTabsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatTabsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule {}
