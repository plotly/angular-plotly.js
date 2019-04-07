import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotComponent } from '../shared/plot/plot.component';
import { PlotlyService } from '../shared/plotly.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [],
    exports: [PlotComponent]
})
export class PlotlyViaCDNModule {
    static plotlyVersion?: string = 'latest';

    static setPlotlyVersion(version: string) {
        const isOk = version === 'latest' || /^\d\.\d{1,2}\.\d{1,2}$/.test(version);
        if (!isOk) {
            throw new Error(`Invalid plotly version. Please set 'latest' or version number (i.e.: 1.4.3)`);
        }

        PlotlyViaCDNModule.plotlyVersion = version;
    }

    static loadViaCDN() {
        PlotlyService.setPlotly('waiting');
        const src = `https://cdn.plot.ly/plotly-${PlotlyViaCDNModule.plotlyVersion}.min.js`;

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

    static forRoot(config: Partial<{version: string}>): ModuleWithProviders<PlotlyViaCDNModule> {
        if (config.version === undefined) {
            console.warn(`It's strongly recommended that you set a plotly version when using via CDN.`);
            config.version = 'latest';
        }

        PlotlyViaCDNModule.setPlotlyVersion(config.version);
        PlotlyViaCDNModule.loadViaCDN();

        return {
            ngModule: PlotlyViaCDNModule,
            providers: [PlotlyService]
        };
    }
}
