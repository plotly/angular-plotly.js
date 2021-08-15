import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotlyService } from './plotly.service';
import { PlotlySharedModule } from './plotly-shared.module';


export type PlotlyBundleName = 'basic' | 'cartesian' | 'geo' | 'gl3d' | 'gl2d' | 'mapbox' | 'finance';


@NgModule({
    declarations: [],
    imports: [CommonModule, PlotlySharedModule],
    providers: [PlotlyService],
    exports: [PlotlySharedModule],
})
export class PlotlyViaCDNModule {
    private static plotlyBundle?: string = null;
    private static plotlyVersion = 'latest';
    public static plotlyBundleNames: PlotlyBundleName[] = ['basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox', 'finance'];

    constructor(public plotlyService: PlotlyService) {
        PlotlyService.setModuleName('ViaCDN');
    }

    public static setPlotlyVersion(version: string): void {
        const isOk = version === 'latest' || /^\d\.\d{1,2}\.\d{1,2}$/.test(version);
        if (!isOk) {
            throw new Error(`Invalid plotly version. Please set 'latest' or version number (i.e.: 1.4.3)`);
        }

        PlotlyViaCDNModule.loadViaCDN();
        PlotlyViaCDNModule.plotlyVersion = version;
    }

    public static setPlotlyBundle(bundle: PlotlyBundleName | null): void {
        const isOk = bundle === null || PlotlyViaCDNModule.plotlyBundleNames.indexOf(bundle) >= 0;
        if (!isOk) {
            const names = PlotlyViaCDNModule.plotlyBundleNames.map(n => `"${n}"`).join(', ');
            throw new Error(`Invalid plotly bundle. Please set to null for full or ${names} for a partial bundle.`);
        }

        PlotlyViaCDNModule.plotlyBundle = bundle;
    }

    public static loadViaCDN(): void {
        PlotlyService.setPlotly('waiting');

        const init = () => {
            const src = PlotlyViaCDNModule.plotlyBundle == null
                ? `https://cdn.plot.ly/plotly-${PlotlyViaCDNModule.plotlyVersion}.min.js`
                : `https://cdn.plot.ly/plotly-${PlotlyViaCDNModule.plotlyBundle}-${PlotlyViaCDNModule.plotlyVersion}.min.js`;

            const script: HTMLScriptElement = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            script.onerror = () => console.error(`Error loading plotly.js library from ${src}`);

            const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
            head.appendChild(script);

            let counter = 200; // equivalent of 10 seconds...

            const fn = () => {
                const plotly = (window as any).Plotly;
                if (plotly) {
                    PlotlyService.setPlotly(plotly);
                } else if (counter > 0) {
                    counter --;
                    setTimeout(fn, 50);
                } else {
                    throw new Error(`Error loading plotly.js library from ${src}. Timeout.`);
                }
            };

            fn();
        };

        setTimeout(init);
    }
}
