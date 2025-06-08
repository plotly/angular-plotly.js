import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as PlotlyJS from 'plotly.js-dist';
import { PlotlyModule } from '../../../plotly/src/lib/plotly.module';
import { PlotlyViaCDNModule } from 'projects/plotly/src/lib/plotly-via-cdn.module';



import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // PlotlyModule.forRoot(PlotlyJS),
    PlotlyViaCDNModule.forRoot({version: '3.0.1'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
