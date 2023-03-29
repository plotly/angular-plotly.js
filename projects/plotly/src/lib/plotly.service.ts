import { Injectable } from '@angular/core';
import { Plotly } from './plotly.interface';

type PlotlyName = 'Plotly' | 'ViaCDN' | 'ViaWindow';


@Injectable({
    providedIn: 'root'
})
export class PlotlyService {
    protected static instances: Plotly.PlotlyHTMLElement[] = [];
    protected static plotly?: any = undefined;
    protected static moduleName?: PlotlyName = undefined;

    public static setModuleName(moduleName: PlotlyName): void {
        PlotlyService.moduleName = moduleName;
    }

    public static getModuleName(): PlotlyName {
        return PlotlyService.moduleName;
    }

    public static setPlotly(plotly: any): void {
        if (typeof plotly === 'object' && typeof plotly.react !== 'function') {
            throw new Error('Invalid plotly.js version. Please, use any version above 1.40.0');
        }

        PlotlyService.plotly = plotly;
    }

    public static insert(instance: Plotly.PlotlyHTMLElement): Plotly.PlotlyHTMLElement {
        const index = PlotlyService.instances.indexOf(instance);
        if (index === -1) {
            PlotlyService.instances.push(instance);
        }
        return instance;
    }

    public static remove(div: Plotly.PlotlyHTMLElement): void {
        const index = PlotlyService.instances.indexOf(div);
        if (index >= 0) {
            PlotlyService.instances.splice(index, 1);
            PlotlyService.plotly.purge(div);
        }
    }

    public getInstanceByDivId(id: string): Plotly.PlotlyHTMLElement | undefined {
        for (const instance of PlotlyService.instances) {
            if (instance && instance.id === id) {
                return instance;
            }
        }
        return undefined;
    }

    public async getPlotly(): Promise<any> {
        await this.waitFor(() => this._getPlotly() !== 'waiting');
        return this._getPlotly();
    }

    protected _getPlotly(): any {
        if (typeof PlotlyService.plotly === 'undefined') {
            const msg = PlotlyService.moduleName === 'ViaCDN'
                ? `Error loading Peer dependency plotly.js from CDN url`
                : `Peer dependency plotly.js isn't installed`;

            throw new Error(msg);
        }

        return PlotlyService.plotly;
    }

    protected waitFor(fn: () => boolean): Promise<void> {
        return new Promise((resolve) => {
            const localFn = () => {
                fn() ? resolve() : setTimeout(localFn, 10);
            };

            localFn();
        });
    }

    public async newPlot(div: HTMLDivElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>, frames?: Partial<Plotly.Config>[]): Promise<any> {
        await this.waitFor(() => this._getPlotly() !== 'waiting');

        if (frames) {
            const obj = {data, layout, config, frames};
            return this._getPlotly().newPlot(div, obj).then(() => PlotlyService.insert(div as any)) as Promise<any>;
        }

        return this._getPlotly().newPlot(div, data, layout, config).then(() => PlotlyService.insert(div as any)) as Promise<any>;
    }

    public plot(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>, frames?: Partial<Plotly.Config>[]): Promise<any>  {
        if (frames) {
            const obj = {data, layout, config, frames};
            if (typeof(this._getPlotly().plot) === 'function') {
                return this._getPlotly().plot(div, obj) as Promise<any>;
            } else {
                // Adds support for Plotly 2.0.0 release candidates
                return this._getPlotly().newPlot(div, obj) as Promise<any>;
            }
        }

        if (typeof(this._getPlotly().plot) === 'function') {
            return this._getPlotly().plot(div, data, layout, config) as Promise<any>;
        } else {
            // Adds support for Plotly 2.0.0 release candidates
            return this._getPlotly().newPlot(div, data, layout, config) as Promise<any>;
        }
    }

    public update(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>, frames?: Partial<Plotly.Config>[]): Promise<any>  {
        if (frames) {
            const obj = {data, layout, config, frames};
            return this._getPlotly().react(div, obj) as Promise<any>;
        }

        return this._getPlotly().react(div, data, layout, config) as Promise<any>;
    }

    public resize(div: Plotly.PlotlyHTMLElement): void {
        return this._getPlotly().Plots.resize(div);
    }
}
