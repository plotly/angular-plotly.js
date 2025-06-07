import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotlyService } from './plotly.service';
import { PlotlyComponent } from './plotly.component';


@NgModule({
    imports: [CommonModule, PlotlyComponent],
    providers: [PlotlyService],
    exports: [PlotlyComponent],
})
export class PlotlySharedModule {
    constructor() { }
}
