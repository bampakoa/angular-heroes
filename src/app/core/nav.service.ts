import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Character } from '../characters/character.model';

@Injectable()
export class NavService {
  navSubject = new Subject<Character>();

  constructor() { }

  show(character: Character) {
    this.navSubject.next(character);
  }

  hide() {
    this.navSubject.next();
  }

}
