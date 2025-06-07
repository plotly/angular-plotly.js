import { NgModule } from '@angular/core';

import { PlotlyService } from './plotly.service';
import { PlotlyComponent } from './plotly.component';



@NgModule({
  imports: [PlotlyComponent],
  providers: [PlotlyService],
  exports: [PlotlyComponent],
})
export class PlotlyModule {
    public static plotlyjs: any = {};

    constructor() {
        if (!this.isValid()) {
            const msg = 'Invalid PlotlyJS object. Please check https://github.com/plotly/angular-plotly.js#quick-start'
                + ' to see how to add PlotlyJS to your project.';
            throw new Error(msg);
        }

        PlotlyService.setPlotly(PlotlyModule.plotlyjs);
    }

    private isValid(): boolean {
        return PlotlyModule.plotlyjs !== undefined
            && (typeof PlotlyModule.plotlyjs.plot === 'function'
                || typeof PlotlyModule.plotlyjs.newPlot === 'function');
    }
}
