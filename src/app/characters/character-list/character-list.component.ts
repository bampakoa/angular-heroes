import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar
} from '@angular/material/snack-bar';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, Subject, switchMap } from 'rxjs';

import { AppConfig, APP_CONFIG } from '../../app.config';
import { Character } from '../../core/character.model';
import { CharacterService } from '../characters.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {

  characters$: Observable<Character[]> = EMPTY;
  selectedCharacter: Character | undefined;
  showProgress = false;

  @ViewChild(MatDrawer) private drawer: MatDrawer | undefined;
  private searchTerms = new Subject<string>();
  private matSnackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  constructor(private snackbar: MatSnackBar, private characterService: CharacterService, @Inject(APP_CONFIG) private config: AppConfig) {}

  ngOnInit() {
    this.getCharacters();
  }

  search(name: string) {
    this.searchTerms.next(name);
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
    this.drawer?.toggle();
  }

  private showWarning(reason: 'too-many-results' | 'no-results') {
    let message = '';

    switch (reason) {
      case 'too-many-results':
        message = 'There are more results of your search that are not currently displayed. Please try to refine your search criteria.';
        break;
      case 'no-results':
        message = 'There are no results found. Please try to refine your search criteria.';
        break;
    }

    this.matSnackBarRef = this.snackbar.open(message, 'Dismiss', { duration: 5000 });
  }

  private getCharacters() {
    this.characters$ = this.searchTerms.pipe(
      filter(term => term.length >= 3),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.showProgress = true;
        this.matSnackBarRef?.dismiss();

        return this.characterService.getCharacters(term).pipe(
          catchError(() => {
            this.showProgress = false;
            return EMPTY;
          })
        );
      }),
      map(({ results: heroes, total }) => {
        this.showProgress = false;

        // Show notification when total results are more than the pre-defined limit
        if (total > this.config.charactersLimit) {
          this.showWarning('too-many-results');
        }

        // Show notification when there are no results
        if (total === 0) {
          this.showWarning('no-results');
        }

        return heroes;
      })
    );
  }

}
