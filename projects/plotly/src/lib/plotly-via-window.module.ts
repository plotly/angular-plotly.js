import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotlyComponent } from './plotly.component';
import { PlotlyService } from './plotly.service';


@NgModule({
    declarations: [PlotlyComponent],
    imports: [CommonModule],
    providers: [PlotlyService],
    exports: [PlotlyComponent],
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
