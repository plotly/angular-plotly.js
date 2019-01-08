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
    protected static instances: Plotly.PlotlyHTMLElement[] = [];

    constructor() {
        if (typeof this.getPlotly() === 'undefined') {
            throw new Error(`Peer dependency plotly.js isn't installed`);
        }
    }

    public static insert(instance: Plotly.PlotlyHTMLElement) {
        const index = PlotlyService.instances.indexOf(instance);
        if (index === -1) {
            PlotlyService.instances.push(instance);
        }
        return instance;
    }

    public static remove(div: Plotly.PlotlyHTMLElement) {
        const index = PlotlyService.instances.indexOf(div);
        if (index >= 0) {
            PlotlyService.instances.splice(index, 1);
        }
    }

    public getPlotly() {
        return Plotlyjs;
    }

    public newPlot(div: HTMLDivElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>) {
        return this.getPlotly().newPlot(div, data, layout, config).then(instance => PlotlyService.insert(instance))  as Promise<any>;
    }

    public plot(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>) {
        return this.getPlotly().plot(div, data, layout, config) as Promise<any>;
    }

    public update(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>) {
        return this.getPlotly().react(div, data, layout, config) as Promise<any>;
    }

    public resize(div: Plotly.PlotlyHTMLElement): void {
        return this.getPlotly().Plots.resize(div);
    }
}
