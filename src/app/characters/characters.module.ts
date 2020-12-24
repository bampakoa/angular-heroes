import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../app-material.module';
import { ComicsModule } from '../comics/comics.module';
import { CharacterCardComponent } from './character-card/character-card.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterListComponent } from './character-list/character-list.component';

@NgModule({
  imports: [
    AppMaterialModule,
    ComicsModule,
    CommonModule
  ],
  declarations: [
    CharacterCardComponent,
    CharacterDetailComponent,
    CharacterListComponent,
  ]
})
export class CharacterModule {}
