import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppErrorHandler } from './app-error-handler';
import { AppComponent } from './app.component';
import { APP_CONFIG, appSettings } from './app.config';
import { AuthInterceptor } from './auth-interceptor.service';
import { CharactersModule } from './characters/characters.module';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CharactersModule,
    FooterComponent,
    HeaderComponent,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
    { provide: APP_CONFIG, useValue: appSettings },
        provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
