import { Component } from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  imports: [MatToolbar, MatToolbarRow]
})
export class Footer {}
