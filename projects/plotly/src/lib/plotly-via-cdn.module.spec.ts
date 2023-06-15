import { PlotlyBundleName } from './plotly-via-cdn.module';

import { PlotlyViaCDNModule } from './plotly-via-cdn.module';
import { PlotlyService } from './plotly.service';

describe('PlotlyViaCDNModule', () => {
    const plotlyServiceCache: any = {};

    beforeEach(() => {
        plotlyServiceCache.moduleName = (PlotlyService as any).moduleName;
    });

    afterEach(() => {
        (PlotlyService as any).moduleName = plotlyServiceCache.moduleName;
    });

    it('should create', () => {
        const plotlyService = jasmine.createSpyObj('PlotlyService', ['setModuleName']);
        const _ = new PlotlyViaCDNModule(plotlyService);

        expect((PlotlyService as any).moduleName).toBe('ViaCDN');
    });

    it('should set Plotly Bundle', () => {
        const validValues: any[] = ['basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox', 'finance', null];
        for (const value of validValues) {
            PlotlyViaCDNModule.setPlotlyBundle(value);
            expect((PlotlyViaCDNModule as any).plotlyBundle).toBe(value);
        }

        const fn = () => (PlotlyViaCDNModule as any).setPlotlyBundle('Invalid name');
        const msg = `Invalid plotly bundle. Please set to null for full or "basic", "cartesian", "geo", "gl3d", "gl2d", "mapbox", "finance" for a partial bundle.`;
        expect(fn).toThrowError(msg);
    });

    describe(".setPlotlyVersion", () => {
        it('should set Plotly version', () => {
            const version = "latest";
            spyOn(PlotlyViaCDNModule, "loadViaCDN");

            PlotlyViaCDNModule.setPlotlyVersion(version);

            expect(PlotlyViaCDNModule.loadViaCDN).toHaveBeenCalled();
            expect((PlotlyViaCDNModule as any).plotlyVersion).toBe(version);
        });

        it('should NOT set Plotly version', () => {
            const errorMsg= "Invalid plotly version. Please set 'latest' or version number (i.e.: 1.4.3) or strict version number (i.e.: strict-1.4.3)";
            spyOn(PlotlyViaCDNModule, "loadViaCDN").and.callThrough();

            let version = "invalid";
            expect(() => { PlotlyViaCDNModule.setPlotlyVersion(version); }).toThrowError(errorMsg);

            version = "strict-1";
            expect(() => { PlotlyViaCDNModule.setPlotlyVersion(version); }).toThrowError(errorMsg);

            version = "1";
            expect(() => { PlotlyViaCDNModule.setPlotlyVersion(version); }).toThrowError(errorMsg);

            version = "strict-1.1.a";
            expect(() => { PlotlyViaCDNModule.setPlotlyVersion(version); }).toThrowError(errorMsg);

            version = "strit-1.1.1";
            expect(() => { PlotlyViaCDNModule.setPlotlyVersion(version); }).toThrowError(errorMsg);
        });

        it('should allow Plotly version with strict- at the beginning', () => {
            const version = "strict-2.24.1";
            spyOn(PlotlyViaCDNModule, "loadViaCDN");

            PlotlyViaCDNModule.setPlotlyVersion(version);
            expect((PlotlyViaCDNModule as any).plotlyVersion).toBe(version);
        });
    });
});
