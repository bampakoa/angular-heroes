import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ContextService } from '../core.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  version: string;

  constructor(public contextService: ContextService) {
    this.version = environment.settings.version;
  }

}
