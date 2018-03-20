import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { DemoModule } from './demo/demo.module';
import { AppComponent } from './app.component';
import { PlotlyModule } from './plotly/plotly.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PlotlyModule,
    DemoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
