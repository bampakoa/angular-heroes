import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
  declarations: [
    CharacterDetailComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule
  ],
  exports: [
    CharacterDetailComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {}
