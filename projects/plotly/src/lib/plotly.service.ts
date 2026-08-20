import { Injectable } from '@angular/core';
import { Plotly } from './plotly.interface';

type PlotlyName = 'PlotlyJS' | 'ViaCDN' | 'ViaWindow' | undefined;


@Injectable({
    providedIn: 'root'
})
export class PlotlyService {
    protected static instances: Plotly.PlotlyHTMLElement[] = [];
    public static plotly?: any = undefined;
    protected static moduleName?: PlotlyName = undefined;
    protected static loadError?: Error;

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

        PlotlyService.moduleName = 'PlotlyJS';
        PlotlyService.plotly = plotly;
        PlotlyService.loadError = undefined;
    }

    public static setPlotlyError(error: Error): void {
        PlotlyService.plotly = undefined;
        PlotlyService.loadError = error;
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
        await this.waitForPlotly();
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
                if (fn()) {
                    resolve();
                } else {
                    setTimeout(localFn, 10);
                }
            };

            localFn();
        });
    }

    protected waitForPlotly(): Promise<void> {
        return new Promise((resolve, reject) => {
            const check = () => {
                if (PlotlyService.loadError) {
                    reject(PlotlyService.loadError);
                } else if (PlotlyService.plotly === 'waiting') {
                    setTimeout(check, 10);
                } else {
                    try {
                        this._getPlotly();
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                }
            };

            check();
        });
    }

    public async newPlot(div: HTMLDivElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>, frames?: Partial<Plotly.Config>[]): Promise<any> {
        await this.waitForPlotly();

        if (frames) {
            const obj = { data, layout, config, frames };
            return this._getPlotly().newPlot(div, obj).then(() => PlotlyService.insert(div as any)) as Promise<any>;
        }

        return this._getPlotly().newPlot(div, data, layout, config).then(() => PlotlyService.insert(div as any)) as Promise<any>;
    }

    public plot(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>, frames?: Partial<Plotly.Config>[]): Promise<any> {
        if (frames) {
            const obj = { data, layout, config, frames };
            return this._getPlotly().newPlot(div, obj) as Promise<any>;
        }

        return this._getPlotly().newPlot(div, data, layout, config) as Promise<any>;
    }

    public update(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>, frames?: Partial<Plotly.Config>[]): Promise<any> {
        if (frames) {
            const obj = { data, layout, config, frames };
            return this._getPlotly().react(div, obj) as Promise<any>;
        }

        return this._getPlotly().react(div, data, layout, config) as Promise<any>;
    }

    public resize(div: Plotly.PlotlyHTMLElement): void {
        return this._getPlotly().Plots.resize(div);
    }
}
