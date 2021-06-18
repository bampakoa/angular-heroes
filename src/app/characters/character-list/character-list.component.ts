import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { EMPTY, merge, Observable, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { Character } from '../../core/character.model';
import { CharacterService, MarvelResponse } from '../characters.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements AfterViewInit {

  characters$: Observable<Character[]>;
  selectedCharacter: Character;
  showProgress = false;
  charactersCounters: Omit<MarvelResponse['data'], 'results'> = {
    count: null,
    offset: null,
    total: null,
    limit: null
  };

  @ViewChild(MatDrawer) private drawer: MatDrawer;
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  private searchTerms = new Subject<string>();

  constructor(private characterService: CharacterService) {}

  ngAfterViewInit() {
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
    const search$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { this.paginator.pageIndex = 0; })
    );

    this.characters$ = merge(search$, this.paginator.page).pipe(
      withLatestFrom(this.searchTerms),
      map(([_, term]) => term),
      filter((term) => term.length >= 3),
      switchMap((term) => {
        this.showProgress = true;
        const limit = this.paginator.pageSize;
        const offset = limit * this.paginator.pageIndex;
        return this.characterService.getCharacters(term, offset, limit);
      }),
      map(({ results: heroes, ...counters }) => {
        this.charactersCounters = counters;
        this.showProgress = false;
        return heroes;
      }),
      catchError(() => {
        this.charactersCounters = {
          count: null,
          offset: null,
          total: null,
          limit: null
        };
        this.showProgress = false;
        return EMPTY;
      })
    );
  }

}
