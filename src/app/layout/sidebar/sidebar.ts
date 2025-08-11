import { ChangeDetectionStrategy, Component, inject, OnInit, viewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';

import { CharacterDetail } from '../../characters/character-detail/character-detail';
import { ComicList } from '../../comics/comic-list/comic-list';
import { Character } from '../../models/character';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatTabGroup,
    MatTab,
    CharacterDetail,
    ComicList
  ],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar implements OnInit {
  private route = inject(ActivatedRoute);
  private drawer = inject(MatDrawer);
  
  character!: Character;
  readonly tab = viewChild.required(MatTabGroup);

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.tab().selectedIndex = 0;
      this.drawer.toggle();
      this.character = data['character'];
    });
  }
}
