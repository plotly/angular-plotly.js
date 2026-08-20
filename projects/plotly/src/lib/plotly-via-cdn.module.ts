import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotlyService } from './plotly.service';
import { PlotlyComponent } from './plotly.component';


export type PlotlyBundleName = 'basic' | 'cartesian' | 'geo' | 'gl3d' | 'gl2d' | 'mapbox' | 'finance' | 'strict';
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
    private static readonly loadingScripts = new Map<string, Promise<any>>();

    constructor(public plotlyService: PlotlyService) {
        PlotlyService.setModuleName('ViaCDN');
    }

    public static forRoot(config: PlotlyModuleConfig): ModuleWithProviders<PlotlyViaCDNModule> {
        config = Object.assign({
            bundleName: null,
            cdnProvider: 'plotly',
            version: '2.35.3',
            customUrl: ''
        }, config);

        let isOk = config.version === 'latest' || /^(strict-)?\d+\.\d+\.\d+$/.test(config.version);
        if (!isOk) {
            throw new Error(`Invalid plotly version. Please set 'latest' or version number (i.e.: 1.4.3) or strict version number (i.e.: strict-1.4.3)`);
        }

        const plotlyBundleNames: PlotlyBundleName[] = ['basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox', 'finance', 'strict'];
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
        PlotlyService.setModuleName('ViaCDN');

        if (typeof document === 'undefined' || typeof window === 'undefined') {
            return;
        }

        PlotlyService.setPlotly('waiting');
        const src = PlotlyViaCDNModule.getCdnUrl(config);
        let loading = PlotlyViaCDNModule.loadingScripts.get(src);

        if (!loading) {
            loading = PlotlyViaCDNModule.createScriptLoader(src);
            PlotlyViaCDNModule.loadingScripts.set(src, loading);
        }

        void loading.then(plotly => {
            PlotlyService.setPlotly(plotly);
        }).catch(error => {
            PlotlyViaCDNModule.loadingScripts.delete(src);
            PlotlyService.setPlotlyError(error);
        });
    }

    private static getCdnUrl(config: PlotlyModuleConfig): string {
        switch (config.cdnProvider) {
            case 'cloudflare':
                return config.bundleName == null
                    ? `https://cdnjs.cloudflare.com/ajax/libs/plotly.js/${config.version}/plotly.min.js`
                    : `https://cdnjs.cloudflare.com/ajax/libs/plotly.js/${config.version}/plotly-${config.bundleName}.min.js`;
            case 'custom':
                return config.customUrl!;
            default:
                return config.bundleName == null
                    ? `https://cdn.plot.ly/plotly-${config.version}.min.js`
                    : `https://cdn.plot.ly/plotly-${config.bundleName}-${config.version}.min.js`;
        }
    }

    private static createScriptLoader(src: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const existingPlotly = (window as any).Plotly;
            if (existingPlotly) {
                resolve(existingPlotly);
                return;
            }

            const script = document.createElement('script');
            const timeout = window.setTimeout(() => {
                script.remove();
                reject(new Error(`Error loading plotly.js library from ${src}. Timeout.`));
            }, 10_000);

            const rejectLoad = () => {
                window.clearTimeout(timeout);
                script.remove();
                reject(new Error(`Error loading plotly.js library from ${src}`));
            };

            script.type = 'text/javascript';
            script.charset = 'utf-8';
            script.src = src;
            script.dataset['angularPlotlySrc'] = src;
            script.onerror = rejectLoad;
            script.onload = () => {
                window.clearTimeout(timeout);
                const plotly = (window as any).Plotly;
                if (plotly) {
                    resolve(plotly);
                } else {
                    rejectLoad();
                }
            };

            document.head.appendChild(script);
        });
    }
}
