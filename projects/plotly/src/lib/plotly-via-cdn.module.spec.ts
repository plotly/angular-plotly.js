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
                version: 'latest',
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

        it('should validate bundleName', () => {
            expect(() => PlotlyViaCDNModule.forRoot({ bundleName: 'unknown' as any } as PlotlyModuleConfig))
                .toThrowError(
                    'Invalid plotly bundle. Please set to null for full or "basic", "cartesian", "geo", "gl3d", "gl2d", "mapbox", "finance" for a partial bundle.'
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
});