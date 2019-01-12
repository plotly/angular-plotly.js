import { Injectable } from '@angular/core';
import { Plotly } from './plotly.interface';


@Injectable({
    providedIn: 'root'
})
export class PlotlyService {
    protected static instances: Plotly.PlotlyHTMLElement[] = [];
    protected static _plotly?: any;

    public static setPlotly(plotly: any) {
        console.log('setPlotly', plotly);
        PlotlyService._plotly = plotly;
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
        if (typeof PlotlyService._plotly === 'undefined') {
            throw new Error(`Peer dependency plotly.js isn't installed`);
        }

        return PlotlyService._plotly;
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
