import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { PlotlyViaWindowModule } from 'projects/plotly/src/lib/plotly-via-window.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PlotlyViaWindowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
