import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';

import { PlotComponent } from '../shared/plot/plot.component';
import { PlotlyService } from '../shared/plotly.service';
import { SharedModule } from '../shared/shared.module';

PlotlyService.setPlotly(PlotlyJS);

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [],
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
