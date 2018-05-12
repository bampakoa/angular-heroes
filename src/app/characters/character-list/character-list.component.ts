import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { CharacterService } from '../characters.service';
import { Character } from '../../core/character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: Observable<Character[]>;
  isVisible = false;
  selectedCharacter: Character;
  showProgress = false;

  @ViewChild(MatDrawer) drawer: MatDrawer;

  private searchTerms = new Subject<string>();

  constructor(private characterService: CharacterService) {}

  getCharacters() {
    const obsNoCharacters = of<Character[]>([]);

    this.characters = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (term) {
          this.showProgress = true;
          return this.characterService.getCharacters(term);
        } else {
          return obsNoCharacters;
        }
      }),
      switchMap(heroes => {
        this.showProgress = false;
        return of(heroes);
      }),
      catchError(() => {
        this.showProgress = false;
        return obsNoCharacters;
      })
    );
  }

  ngOnInit() {
    this.getCharacters();
  }

  search(name: string) {
    this.searchTerms.next(name);
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
    this.drawer.toggle();
  }

  trackByCharacters(index: number, character: Character) { return character.id; }
}
