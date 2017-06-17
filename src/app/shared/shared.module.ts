import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
  declarations: [CharacterDetailComponent],
  imports: [
      AppMaterialModule,
      CommonModule
  ],
  exports: [
      AppMaterialModule,
      CommonModule,
      CharacterDetailComponent
  ]
})
export class SharedModule {}
