import { Component, inject } from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';

import { ContextService } from '../core.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [MatToolbar, MatToolbarRow]
})
export class FooterComponent {
  contextService = inject(ContextService);
}
