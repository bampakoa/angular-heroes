import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/toPromise';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appConfig, appSettings } from './app.config';
import { CharactersModule } from './characters/characters.module';
import { ComicsModule } from './comics/comics.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CharactersModule,
    ComicsModule,
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: appSettings, useValue: appConfig }]
})
export class AppModule {}
