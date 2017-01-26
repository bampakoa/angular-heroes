import { Component, Input, OnInit } from '@angular/core';

import { Character } from '../character.model';
import { CharactersService } from '../characters.service';
import { ImageService } from '../../core/image.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html'
})
export class CharacterDetailComponent {
  @Input() character: Character;

  constructor(private imageService: ImageService, private charactersService: CharactersService) {}

  getAvatar(thumbnail) {
    return this.imageService.getImage('standard_medium', thumbnail);
  }

  getCharacterImage(thumbnail) {
    return this.imageService.getImage('portrait_uncanny', thumbnail);
  }

  getCharacterLink(character: Character) {
    return this.charactersService.getCharacterDetailsUrl(character);
  }
}
