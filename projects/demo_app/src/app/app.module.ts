import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import PlotlyJS from 'plotly.js-dist';
import { PlotlyModule } from 'angular-plotly.js';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PlotlyModule.forRoot(PlotlyJS),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
