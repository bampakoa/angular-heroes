import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { CharacterService } from './characters.service';
import { Character } from '../core/character.model';

export const characterResolver: ResolveFn<Character> = route => {
  const charactersService = inject(CharacterService);
  const id = route.paramMap.get('id');
  return charactersService.getSingle(+id!);
};
