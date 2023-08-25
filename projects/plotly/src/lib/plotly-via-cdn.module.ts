import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotlyService } from './plotly.service';
import { PlotlySharedModule } from './plotly-shared.module';


export type PlotlyBundleName = 'basic' | 'cartesian' | 'geo' | 'gl3d' | 'gl2d' | 'mapbox' | 'finance';
export type PlotlyCDNProvider = 'plotly' | 'cloudflare' | 'custom';

@NgModule({
    declarations: [],
    imports: [CommonModule, PlotlySharedModule],
    providers: [PlotlyService],
    exports: [PlotlySharedModule],
})
export class PlotlyViaCDNModule {
    private static plotlyBundle?: PlotlyBundleName = undefined;
    private static plotlyVersion = 'latest';
    public static plotlyBundleNames: PlotlyBundleName[] = ['basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox', 'finance'];

    constructor(public plotlyService: PlotlyService) {
        PlotlyService.setModuleName('ViaCDN');
    }

    public static setPlotlyVersion(version: string, cdnProvider: PlotlyCDNProvider = 'plotly', cdnURL: string = ''): void {
        const isOk = version === 'latest' || /^(strict-)?\d\.\d{1,2}\.\d{1,2}$/.test(version);
        if (!isOk) {
            throw new Error(`Invalid plotly version. Please set 'latest' or version number (i.e.: 1.4.3) or strict version number (i.e.: strict-1.4.3)`);
        }

        PlotlyViaCDNModule.loadViaCDN(cdnProvider, cdnURL);
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

    public static loadViaCDN(cdnProvider: PlotlyCDNProvider = 'plotly', cdnURL: string = ''): void {
        PlotlyService.setPlotly('waiting');

        const init = () => {
            let src: string = '';
            switch (cdnProvider) {
                case 'cloudflare':
                    if (PlotlyViaCDNModule.plotlyVersion == 'latest') {
                        throw new Error(`As cloudflare hosts version specific files, 'latest' as a version is not supported. Please specify a version or you can choose 'plotly' as a CDN provider.`);
                    }
                    src = PlotlyViaCDNModule.plotlyBundle == null
                        ? `https://cdnjs.cloudflare.com/ajax/libs/plotly.js/${PlotlyViaCDNModule.plotlyVersion}/plotly.min.js`
                        : `https://cdnjs.cloudflare.com/ajax/libs/plotly.js/${PlotlyViaCDNModule.plotlyVersion}/plotly-${PlotlyViaCDNModule.plotlyBundle}.min.js`;
                    break;
                case 'custom':
                    if(!(!!cdnURL && typeof cdnURL === 'string')) {
                        throw new Error(`Invalid or missing CDN URL. Please provide a CDN URL in case of custom provider. Alternatively, you can choose from 'plotly' or 'cloudflare'.`);
                    }
                    src = cdnURL;
                    break;
                default:
                    src = PlotlyViaCDNModule.plotlyBundle == null
                        ? `https://cdn.plot.ly/plotly-${PlotlyViaCDNModule.plotlyVersion}.min.js`
                        : `https://cdn.plot.ly/plotly-${PlotlyViaCDNModule.plotlyBundle}-${PlotlyViaCDNModule.plotlyVersion}.min.js`;
                    break;
            }

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
