import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdGridListModule, MdIconModule,
         MdInputModule, MdListModule, MdProgressBarModule, MdProgressSpinnerModule,
         MdRadioModule, MdSidenavModule, MdTabsModule, MdToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
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
    MdListModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdSidenavModule,
    MdTabsModule,
    MdToolbarModule
  ]
})
export class AppMaterialModule {}
