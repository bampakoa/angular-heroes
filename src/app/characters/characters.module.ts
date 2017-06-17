import { NgModule } from '@angular/core';

import { CharacterCardComponent } from './character-card/character-card.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharactersComponent } from './characters.component';
import { CharactersService } from './characters.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  exports: [CharactersComponent],
  declarations: [
    CharacterCardComponent,
    CharacterListComponent,
    CharactersComponent
  ],
  providers: [CharactersService]
})
export class CharactersModule {}
