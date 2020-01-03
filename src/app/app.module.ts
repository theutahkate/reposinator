import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ResultsComponent } from './results/results.component';
import { CardComponent } from './card/card.component';
import { CommitsComponent } from './commits/commits.component';
import { HttpErrorInterceptor } from './http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ResultsComponent,
    CardComponent,
    CommitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
