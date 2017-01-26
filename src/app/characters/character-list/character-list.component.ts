import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { Character } from '../character.model';
import { CharactersService } from '../characters.service';
import { NavService } from '../../core/nav.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: Observable<Character[]>;
  private searchTerms = new Subject<string>();

  constructor(private charactersService: CharactersService, private navService: NavService) {}

  getCharacters() {
    const obsNoCharacters = Observable.of<Character[]>([]);

    this.characters = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.charactersService.getCharacters(term) : obsNoCharacters)
      .catch(() => obsNoCharacters);
  }

  ngOnInit() {
    this.getCharacters();
  }

  search(term: string): void {
    this.navService.hide();
    this.searchTerms.next(term);
  }

  trackByCharacters(index: number, character: Character) { return character.id; }

}
