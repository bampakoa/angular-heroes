import { Component, Inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { APP_CONFIG, AppConfig } from '../../app.config';
import { ContextService } from '../core.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [MatToolbarModule]
})
export class FooterComponent implements OnInit {

  version = '';

  constructor(public contextService: ContextService, @Inject(APP_CONFIG) private config: AppConfig) {}

  ngOnInit() {
    this.version = this.config.version;
  }

}
