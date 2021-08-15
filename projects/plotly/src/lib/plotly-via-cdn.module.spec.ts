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

});
