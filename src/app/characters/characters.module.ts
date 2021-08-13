import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComicsModule } from '../comics/comics.module';
import { CharacterCardComponent } from './character-card/character-card.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    ComicsModule,
    CommonModule,
    MaterialModule
  ],
  declarations: [
    CharacterCardComponent,
    CharacterDetailComponent,
    CharacterListComponent,
  ]
})
export class CharacterModule {
}
