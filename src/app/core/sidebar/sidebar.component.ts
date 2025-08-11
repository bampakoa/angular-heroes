import { ChangeDetectionStrategy, Component, inject, OnInit, viewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';

import { CharacterDetailComponent } from '../../characters/character-detail/character-detail.component';
import { ComicListComponent } from '../../comics/comic-list/comic-list.component';
import { Character } from '../character.model';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatTabGroup,
    MatTab,
    CharacterDetailComponent,
    ComicListComponent
  ],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private drawer = inject(MatDrawer);
  
  character: Character | undefined;
  readonly tab = viewChild.required(MatTabGroup);

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.tab().selectedIndex = 0;
      this.drawer.toggle();
      this.character = data['character'];
    });
  }
}
