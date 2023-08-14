import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { APP_CONFIG, AppConfig } from '../../app.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['h2 { flex: 1 1 auto; }'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class HeaderComponent implements OnInit {

  title = '';

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  ngOnInit() {
    this.title = this.config.title;
  }

}
