import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { PlotlyService } from './plotly.service';
import { PlotlyComponent } from './plotly.component';


@NgModule({
  imports: [PlotlyComponent],
  providers: [PlotlyService],
  exports: [PlotlyComponent],
})
export class PlotlyModule {
    constructor(){
        if (!this.isValid()) {
            const msg = 'Invalid PlotlyJS object. Please check https://github.com/plotly/angular-plotly.js#quick-start'
                + ' to see how to add PlotlyJS to your project.';
            throw new Error(msg);
        }
    }

    private isValid(): boolean {
        return PlotlyService.plotly !== undefined
            && (typeof PlotlyService.plotly.plot === 'function'
                || typeof PlotlyService.plotly.newPlot === 'function');
    }

    public static forRoot(plotlyjs: any): ModuleWithProviders<PlotlyModule> {
        PlotlyService.setPlotly(plotlyjs);

        return {
            ngModule: PlotlyModule,
            providers: [PlotlyService]
        };
    }
}
