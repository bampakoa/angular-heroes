import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdGridListModule, MdIconModule,
         MdInputModule, MdProgressBarModule, MdProgressSpinnerModule,
         MdSidenavModule, MdTabsModule, MdToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdSidenavModule,
    MdTabsModule,
    MdToolbarModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdSidenavModule,
    MdTabsModule,
    MdToolbarModule
  ]
})
export class AppMaterialModule {}
