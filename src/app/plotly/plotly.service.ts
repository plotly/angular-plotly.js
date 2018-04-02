import { Injectable } from '@angular/core';
import * as Plotly from 'plotly.js';

@Injectable()
export class PlotlyService {
    protected plotly = Plotly;

    constructor() { }

    public newPlot(div: HTMLDivElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>) {
        return this.plotly.newPlot(div, data, layout);
    }

    public plot(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>) {
        return this.plotly.plot(div, data, layout);
    }

}
