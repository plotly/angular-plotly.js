import { Injectable } from '@angular/core';
import * as Plotlyjs from 'plotly.js/dist/plotly.min.js';


export namespace Plotly {
    export type Data = any;
    export type Layout = any;
    export type Config = any;

    export interface Figure {
        data: Data[];
        layout: Partial<Layout>;
        frames: Partial<Config>;
    }

    export interface PlotlyHTMLElement extends HTMLElement {
        on(event: string, callback: Function): void;
        removeListener(event: string, callback: Function): void;
    }
}



@Injectable()
export class PlotlyService {
    protected plotly = Plotlyjs;

    constructor() {
        if (typeof this.plotly === 'undefined') {
            throw new Error(`Peer dependency plotly.js isn't installed`);
        }
    }

    public newPlot(div: HTMLDivElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>) {
        return this.plotly.newPlot(div, data, layout, config);
    }

    public plot(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>) {
        return this.plotly.plot(div, data, layout, config);
    }

    public update(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>) {
        return this.plotly.update(div, data, layout, config);
    }

    public resize(div: Plotly.PlotlyHTMLElement): void {
        return this.plotly.Plots.resize(div);
    }

}
