import { fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { PlotlyViaCDNModule, PlotlyModuleConfig, PlotlyCDNProvider, PlotlyBundleName } from './plotly-via-cdn.module';
import { PlotlyService } from './plotly.service';

describe('PlotlyViaCDNModule', () => {
    beforeEach(() => {
        spyOn(PlotlyViaCDNModule, 'loadViaCDN');
    });

    it('should set the module name to ViaCDN', () => {
        spyOn(PlotlyService, 'setModuleName');
        const fakeService = {} as PlotlyService;
        const module = new PlotlyViaCDNModule(fakeService);
        expect(PlotlyService.setModuleName).toHaveBeenCalledWith('ViaCDN');
        expect(module.plotlyService).toBe(fakeService);
    });

    describe('forRoot', () => {
        it('should call loadViaCDN with default config', () => {
            const result = PlotlyViaCDNModule.forRoot({} as PlotlyModuleConfig);
            expect(PlotlyViaCDNModule.loadViaCDN).toHaveBeenCalledWith({
                bundleName: null,
                cdnProvider: 'plotly',
                version: '2.35.3',
                customUrl: ''
            });
            expect(result.ngModule).toBe(PlotlyViaCDNModule);
            expect(result.providers).toEqual([PlotlyService]);
        });

        it('should validate version', () => {
            expect(() => PlotlyViaCDNModule.forRoot({ version: 'invalid' } as PlotlyModuleConfig))
                .toThrowError(
                    'Invalid plotly version. Please set \'latest\' or version number (i.e.: 1.4.3) or strict version number (i.e.: strict-1.4.3)'
                );
        });

        it('should accept multi-digit semantic versions', () => {
            PlotlyViaCDNModule.forRoot({ version: '10.123.456' });
            expect(PlotlyViaCDNModule.loadViaCDN).toHaveBeenCalledWith(jasmine.objectContaining({
                version: '10.123.456'
            }));
        });

        it('should validate bundleName', () => {
            expect(() => PlotlyViaCDNModule.forRoot({ bundleName: 'unknown' as any } as PlotlyModuleConfig))
                .toThrowError(
                    'Invalid plotly bundle. Please set to null for full or "basic", "cartesian", "geo", "gl3d", "gl2d", "mapbox", "finance", "strict" for a partial bundle.'
                );
        });

        it('should validate cdnProvider', () => {
            expect(() => PlotlyViaCDNModule.forRoot({ cdnProvider: 'unknown' as any } as PlotlyModuleConfig))
                .toThrowError(
                    'Invalid CDN provider. Please set to \'plotly\', \'cloudflare\' or \'custom\'.'
                );
        });

        it('should require customUrl when cdnProvider is custom', () => {
            expect(() => PlotlyViaCDNModule.forRoot({ cdnProvider: 'custom', customUrl: '' } as PlotlyModuleConfig))
                .toThrowError(
                    'Invalid or missing CDN URL. Please provide a CDN URL in case of custom provider.'
                );
        });

        it('should validate cloudflare latest version unsupported', () => {
            expect(() => PlotlyViaCDNModule.forRoot({ cdnProvider: 'cloudflare', version: 'latest' } as PlotlyModuleConfig))
                .toThrowError(
                    'As cloudflare hosts version specific files, \'latest\' as a version is not supported. Please specify a version or you can choose \'plotly\' as a CDN provider.'
                );
        });

        it('should call loadViaCDN and return module for custom config', () => {
            const config: PlotlyModuleConfig = {
                version: '1.2.3',
                bundleName: 'basic' as PlotlyBundleName,
                cdnProvider: 'custom' as PlotlyCDNProvider,
                customUrl: 'http://cdn'
            };
            const result = PlotlyViaCDNModule.forRoot(config);
            expect(PlotlyViaCDNModule.loadViaCDN).toHaveBeenCalledWith(jasmine.objectContaining({
                version: '1.2.3',
                bundleName: 'basic',
                cdnProvider: 'custom',
                customUrl: 'http://cdn'
            }));
            expect(result.ngModule).toBe(PlotlyViaCDNModule);
            expect(result.providers).toEqual([PlotlyService]);
        });
    });

    describe('script loading', () => {
        const config: PlotlyModuleConfig = {
            cdnProvider: 'custom',
            customUrl: 'https://cdn.example.test/plotly.js',
            version: '2.35.3',
            bundleName: null as any,
        };
        const selector = 'script[data-angular-plotly-src]';
        let originalPlotly: any;

        beforeEach(() => {
            originalPlotly = (window as any).Plotly;
            delete (window as any).Plotly;
            (PlotlyViaCDNModule.loadViaCDN as jasmine.Spy).and.callThrough();
            (PlotlyViaCDNModule as any).loadingScripts.clear();
            document.querySelectorAll(selector).forEach(script => script.remove());
        });

        afterEach(() => {
            document.querySelectorAll(selector).forEach(script => script.remove());
            (PlotlyViaCDNModule as any).loadingScripts.clear();
            (window as any).Plotly = originalPlotly;
            PlotlyService.setPlotly({ react(): void { } });
        });

        it('should load Plotly from the configured URL', fakeAsync(() => {
            PlotlyViaCDNModule.loadViaCDN(config);
            const script = document.querySelector(selector) as HTMLScriptElement;
            const fakePlotly = { react(): void { } };
            let loaded: any;

            (window as any).Plotly = fakePlotly;
            script.onload!(new Event('load'));
            flushMicrotasks();
            new PlotlyService().getPlotly().then(plotly => loaded = plotly);
            flushMicrotasks();

            expect(script.src).toBe(config.customUrl!);
            expect(loaded).toBe(fakePlotly);
        }));

        it('should reject when the CDN script fails', fakeAsync(() => {
            PlotlyViaCDNModule.loadViaCDN(config);
            const script = document.querySelector(selector) as HTMLScriptElement;
            let rejection: Error | undefined;

            script.onerror!(new Event('error'));
            flushMicrotasks();
            new PlotlyService().getPlotly().catch(error => rejection = error);
            flushMicrotasks();

            expect(rejection?.message).toContain('Error loading plotly.js library');
        }));

        it('should reject and remove a CDN script after the timeout', fakeAsync(() => {
            PlotlyViaCDNModule.loadViaCDN(config);
            let rejection: Error | undefined;

            tick(10_000);
            flushMicrotasks();
            new PlotlyService().getPlotly().catch(error => rejection = error);
            flushMicrotasks();

            expect(document.querySelector(selector)).toBeNull();
            expect(rejection?.message).toContain('Timeout');
        }));

        it('should deduplicate concurrent requests for the same script', fakeAsync(() => {
            PlotlyViaCDNModule.loadViaCDN(config);
            PlotlyViaCDNModule.loadViaCDN(config);

            expect(document.querySelectorAll(selector).length).toBe(1);
            (document.querySelector(selector) as HTMLScriptElement).onerror!(new Event('error'));
            flushMicrotasks();
        }));
    });
});
