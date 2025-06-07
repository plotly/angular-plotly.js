import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as PlotlyJS from 'plotly.js-dist';
import { PlotlyModule } from 'angular-plotly.js';



import { AppComponent } from './app.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PlotlyModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
