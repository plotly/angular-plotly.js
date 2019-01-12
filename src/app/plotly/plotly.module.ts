import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';

import { PlotComponent } from './plot/plot.component';
import { PlotlyService } from './plotly.service';

PlotlyService.setPlotly(PlotlyJS);

@NgModule({
    imports: [CommonModule],
    declarations: [PlotComponent],
    exports: [PlotComponent]
})
export class PlotlyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PlotlyModule,
            providers: [PlotlyService]
        };
    }
}
