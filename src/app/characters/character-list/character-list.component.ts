import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

import { Character } from '../../core/character.model';
import { CharacterService } from '../characters.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  readonly CHARACTERS_LIMIT = 20;
  characters$: Observable<Character[]>;
  selectedCharacter: Character;
  showProgress = false;
  totalCharactersCount = 0;

  @ViewChild(MatDrawer) private drawer: MatDrawer;
  private searchTerms = new Subject<string>();

  constructor(private characterService: CharacterService) {}

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

  trackByCharacters(_: number, character: Character) { return character.id; }

  private getCharacters() {
    this.characters$ = this.searchTerms.pipe(
      filter(term => term.length >= 3),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.showProgress = true;
        return this.characterService.getCharacters(term, 0, this.CHARACTERS_LIMIT);
      }),
      map(({ results: heroes, ...counters }) => {
        this.totalCharactersCount = counters.total;
        this.showProgress = false;
        return heroes;
      }),
      catchError(() => {
        this.totalCharactersCount = 0;
        this.showProgress = false;
        return EMPTY;
      })
    );
  }

}
