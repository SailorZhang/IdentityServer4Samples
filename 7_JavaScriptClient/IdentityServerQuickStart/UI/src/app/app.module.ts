import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { AuthModule } from './core/auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './root/app.component';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { AppConfig } from './core/auth/app.config';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { DataService } from './core/services/DataService';
import { RebarInterceptor } from './core/services/RebarInterceptor';
import { AppGlobals } from './core/services/AppGlobals';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { VisualizationComponent } from './shared/visualization/visualization.component';
import { NotAuthorizedComponent } from './shared/not-authorized/not-authorized.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    VisualizationComponent,
    NotAuthorizedComponent
  ],

  schemas: [
    NO_ERRORS_SCHEMA
  ],

  imports: [
    BrowserModule, FormsModule, AuthModule, HttpClientModule, routing
  ],
  providers: [
    AppConfig, AppGlobals, DataService,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfig) => () => config.load(),
      deps: [AppConfig], multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RebarInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
