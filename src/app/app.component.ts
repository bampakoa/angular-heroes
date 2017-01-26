import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSidenav, MdTabGroup } from '@angular/material';

import { Character } from './characters/character.model';
import { LoadingService } from './core/loading.service';
import { NavService } from './core/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;
  @ViewChild('tabgroup') tabgroup: MdTabGroup;
  selectedCharacter: Character;
  showProgress = false;

  constructor(private navService: NavService, private loadingService: LoadingService) {}

  ngOnInit() {
    this.navService.navSubject.subscribe(character => {
      this.selectedCharacter = character;

      if(this.selectedCharacter){
        if(!this.sidenav.opened){
          this.sidenav.open();
        }

        this.tabgroup.selectedIndex = 0;
      }
      else{
        this.sidenav.close();
      }
    });

    this.loadingService.loadingSubject.subscribe(show => this.showProgress = show);
  }
}
