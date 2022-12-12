import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  title: string;

  constructor() {
    this.title = environment.settings.appTitle;
  }

}
