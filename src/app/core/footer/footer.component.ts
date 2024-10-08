import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ContextService } from '../core.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [MatToolbarModule]
})
export class FooterComponent {

  constructor(public contextService: ContextService) {}

}
