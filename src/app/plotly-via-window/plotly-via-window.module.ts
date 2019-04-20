import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotComponent } from '../shared/plot/plot.component';
import { PlotlyService } from '../shared/plotly.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [],
    exports: [PlotComponent]
})
export class PlotlyViaWindowModule {
    constructor() {
        const plotly = (window as any).Plotly;

        if (typeof plotly === 'undefined') {
            throw new Error(`Plotly object not found on window.`);
        }

        PlotlyService.setPlotly(plotly);
    }

    static forRoot(): never {
        const url = "https://github.com/plotly/angular-plotly.js#plotly-via-window-module";
        throw new Error(`[PlotlyViaWindowModule] forRoot method is deprecated. Please see: ${url}`);
    }
}
