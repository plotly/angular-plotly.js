import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotComponent } from '../shared/plot/plot.component';
import { PlotlyService } from '../shared/plotly.service';
import { SharedModule } from '../shared/shared.module';

export type PlotlyBundleName = 'basic' | 'cartesian' | 'geo' | 'gl3d' | 'gl2d' | 'mapbox' | 'finance';


@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [],
    exports: [PlotComponent]
})
export class PlotlyViaCDNModule {
    private static _plotlyBundle?: string = null;
    private static _plotlyVersion: string = 'latest';
    static plotlyBundleNames: PlotlyBundleName[] = ['basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox', 'finance'];

    static set plotlyVersion(version: string) {
        const isOk = version === 'latest' || /^\d\.\d{1,2}\.\d{1,2}$/.test(version);
        if (!isOk) {
            throw new Error(`Invalid plotly version. Please set 'latest' or version number (i.e.: 1.4.3)`);
        }

        PlotlyViaCDNModule._plotlyVersion = version;
    }

    static set plotlyBundle(bundle: PlotlyBundleName) {
        const isOk = bundle === null || PlotlyViaCDNModule.plotlyBundleNames.indexOf(bundle) >= 0;
        if (!isOk) {
            const names = PlotlyViaCDNModule.plotlyBundleNames.map(n => `"${n}"`).join(', ');
            throw new Error(`Invalid plotly bundle. Please set to null for full or ${names} for a partial bundle.`);
        }

        PlotlyViaCDNModule._plotlyBundle = bundle;
    }

    static loadViaCDN() {
        PlotlyService.setPlotly('waiting');
        const src = PlotlyViaCDNModule._plotlyBundle == null
            ? `https://cdn.plot.ly/plotly-${PlotlyViaCDNModule._plotlyVersion}.min.js`
            : `https://cdn.plot.ly/plotly-${PlotlyViaCDNModule._plotlyBundle}-${PlotlyViaCDNModule._plotlyBundle}.min.js`;

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
    }

    static forRoot(config: Partial<{version: string}>): never {
        const url = "https://github.com/plotly/angular-plotly.js#customizing-the-plotlyjs-bundle";
        throw new Error(`[PlotlyViaCDNModule] forRoot method is deprecated. Please see: ${url}`);
    }
}
