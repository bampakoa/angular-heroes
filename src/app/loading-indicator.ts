import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicator {
  showProgress = signal(false);
}
