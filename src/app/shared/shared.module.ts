import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotComponent } from './plot/plot.component';
import { PlotlyService } from './plotly.service';

@NgModule({
    imports: [CommonModule],
    declarations: [PlotComponent],
    providers: [PlotlyService],
    exports: [PlotComponent]
})
export class SharedModule { }
