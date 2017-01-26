import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { appConfig, appSettings } from './app.config';
import { CharactersModule } from './characters/characters.module';
import { ComicsModule } from './comics/comics.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CharactersModule,
    ComicsModule,
    CoreModule,
    MaterialModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: appSettings, useValue: appConfig }]
})
export class AppModule {}
