import { Component, Input } from '@angular/core';

import { Character } from '../character.model';
import { CharactersService } from '../characters.service';
import { ImageService } from '../../core/image.service';
import { NavService } from '../../core/nav.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html'
})
export class CharacterCardComponent {
  @Input() character: Character;

  constructor(private imageService: ImageService, private navService: NavService, private charactersService: CharactersService) {}

  getCharacterImage(thumbnail) {
    return this.imageService.getImage('landscape_incredible', thumbnail);
  }

  showCharacter(character: Character) {
    this.navService.show(character);
  }

  getCharacterLink(character: Character) {
    return this.charactersService.getCharacterDetailsUrl(character);
  }
}
