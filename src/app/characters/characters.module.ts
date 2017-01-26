import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { CharacterCardComponent } from './character-card/character-card.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharactersComponent } from './characters.component';
import { CharactersService } from './characters.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CharacterDetailComponent,
    CharactersComponent
  ],
  declarations: [
    CharacterCardComponent,
    CharacterDetailComponent,
    CharacterListComponent,
    CharactersComponent
  ],
  providers: [CharactersService]
})
export class CharactersModule {}
