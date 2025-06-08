import { NgModule } from '@angular/core';
import { PlotlyService } from './plotly.service';
import { PlotlyComponent } from './plotly.component';


@NgModule({
    imports: [PlotlyComponent],
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