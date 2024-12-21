import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar
} from '@angular/material/snack-bar';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, Subject, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Character } from '../../core/character.model';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { CharacterService } from '../characters.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
  imports: [
    MatFormField,
    MatInput,
    MatIconButton,
    MatSuffix,
    MatIcon,
    MatGridList,
    MatGridTile,
    CharacterCardComponent,
    AsyncPipe
  ]
})
export class CharacterListComponent implements OnInit {
  private snackbar = inject(MatSnackBar);
  private characterService = inject(CharacterService);
  private searchTerms = new Subject<string>();
  private matSnackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  characters$: Observable<Character[]> = EMPTY;

  ngOnInit() {
    this.getCharacters();
  }

  search(name: string) {
    this.searchTerms.next(name);
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
        this.matSnackBarRef?.dismiss();

        return this.characterService.getAll(term).pipe(
          catchError(() => EMPTY)
        );
      }),
      map(({ results: heroes, total }) => {
        // Show notification when total results are more than the pre-defined limit
        if (total > environment.charactersLimit) {
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
