import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotComponent } from './plot/plot.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PlotComponent],
  exports: [PlotComponent],
})
export class PlotlyModule {

}
