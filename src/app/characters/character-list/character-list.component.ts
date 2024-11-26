import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar
} from '@angular/material/snack-bar';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, Subject, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ComicListComponent } from '../../comics/comic-list/comic-list.component';
import { Character } from '../../core/character.model';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { CharacterService } from '../characters.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css',
  standalone: true,
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatTabGroup,
    MatTab,
    CharacterDetailComponent,
    ComicListComponent,
    MatDrawerContent,
    MatProgressBar,
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

  characters$: Observable<Character[]> = EMPTY;
  selectedCharacter: Character | undefined;
  showProgress = false;

  @ViewChild(MatDrawer) private drawer: MatDrawer | undefined;
  private searchTerms = new Subject<string>();
  private matSnackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

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
