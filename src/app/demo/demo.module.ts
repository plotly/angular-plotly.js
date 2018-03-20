import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo.component';

import { PlotlyModule } from '../plotly/plotly.module';

@NgModule({
  imports: [CommonModule, PlotlyModule],
  declarations: [HomeComponent, DemoComponent]
})
export class DemoModule { }
