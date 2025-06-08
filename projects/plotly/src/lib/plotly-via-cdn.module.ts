import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotlyService } from './plotly.service';
import { PlotlyComponent } from './plotly.component';


export type PlotlyBundleName = 'basic' | 'cartesian' | 'geo' | 'gl3d' | 'gl2d' | 'mapbox' | 'finance';
export type PlotlyCDNProvider = 'plotly' | 'cloudflare' | 'custom';

export interface PlotlyModuleConfig {
    bundleName?: PlotlyBundleName;
    cdnProvider?: PlotlyCDNProvider;
    version?: string;
    customUrl?: string;
}


@NgModule({
    imports: [CommonModule, PlotlyComponent],
    providers: [PlotlyService],
    exports: [PlotlyComponent],
})
export class PlotlyViaCDNModule {
    constructor(public plotlyService: PlotlyService) {
        PlotlyService.setModuleName('ViaCDN');
    }

    public static forRoot(config: PlotlyModuleConfig): ModuleWithProviders<PlotlyViaCDNModule> {
        config = Object.assign({
            bundleName: null,
            cdnProvider: 'plotly',
            version: 'latest',
            customUrl: ''
        }, config);

        let isOk = config.version === 'latest' || /^(strict-)?\d\.\d{1,2}\.\d{1,2}$/.test(config.version);
        if (!isOk) {
            throw new Error(`Invalid plotly version. Please set 'latest' or version number (i.e.: 1.4.3) or strict version number (i.e.: strict-1.4.3)`);
        }

        const plotlyBundleNames: PlotlyBundleName[] = ['basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox', 'finance']
        isOk = config.bundleName === null || plotlyBundleNames.includes(config.bundleName);
        if (!isOk) {
            const names = plotlyBundleNames.map(n => `"${n}"`).join(', ');
            throw new Error(`Invalid plotly bundle. Please set to null for full or ${names} for a partial bundle.`);
        }

        isOk = ['plotly', 'cloudflare', 'custom'].includes(config.cdnProvider);
        if (!isOk) {
            throw new Error(`Invalid CDN provider. Please set to 'plotly', 'cloudflare' or 'custom'.`);
        }

        if (config.cdnProvider === 'cloudflare' && config.version == 'latest') {
            throw new Error(`As cloudflare hosts version specific files, 'latest' as a version is not supported. Please specify a version or you can choose 'plotly' as a CDN provider.`);
        }

        if (config.cdnProvider === 'custom' && !config.customUrl) {
            throw new Error(`Invalid or missing CDN URL. Please provide a CDN URL in case of custom provider.`);
        }

        PlotlyViaCDNModule.loadViaCDN(config);

        return {
            ngModule: PlotlyViaCDNModule,
            providers: [PlotlyService],
        };
    }

    public static loadViaCDN(config: PlotlyModuleConfig): void {
        PlotlyService.setPlotly('waiting');

        const init = () => {
            let src: string = '';
            switch (config.cdnProvider) {
                case 'cloudflare':
                    src = config.bundleName == null
                        ? `https://cdnjs.cloudflare.com/ajax/libs/plotly.js/${config.version}/plotly.min.js`
                        : `https://cdnjs.cloudflare.com/ajax/libs/plotly.js/${config.version}/plotly-${config.bundleName}.min.js`;
                    break;
                case 'custom':
                    src = config.customUrl;
                    break;
                default:
                    src = config.bundleName == null
                        ? `https://cdn.plot.ly/plotly-${config.version}.min.js`
                        : `https://cdn.plot.ly/plotly-${config.bundleName}-${config.version}.min.js`;
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