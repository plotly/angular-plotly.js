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
export class PlotlyModule {
    public static plotlyjs: any;

    constructor() {
        if (!this.isValid()) {
            const msg = "Invalid PlotlyJS object. Please check https://github.com/plotly/angular-plotly.js#quick-start"
                      + " to see how to add PlotlyJS to your project.";
            throw new Error(msg);
        }

        PlotlyService.setPlotly(PlotlyModule.plotlyjs);
    }

    private isValid(): boolean {
        return PlotlyModule.plotlyjs !== undefined
            && typeof PlotlyModule.plotlyjs.plot === 'function';
    }
}
