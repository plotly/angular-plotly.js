import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotComponent } from './plot/plot.component';
import { PlotlyService } from './plotly.service';

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
