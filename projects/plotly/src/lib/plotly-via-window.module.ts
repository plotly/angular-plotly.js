import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotlyService } from './plotly.service';
import { PlotlyModule } from './plotly.module';


@NgModule({
    declarations: [],
    imports: [CommonModule, PlotlyModule],
    providers: [PlotlyService],
    exports: [PlotlyModule],
})
export class PlotlyViaWindowModule {
    constructor() {
        const plotly = (window as any).Plotly;

        if (typeof plotly === 'undefined') {
            throw new Error(`Plotly object not found on window.`);
        }

        PlotlyService.setPlotly(plotly);
    }
}
