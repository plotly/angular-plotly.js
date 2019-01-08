import { TestBed, inject } from '@angular/core/testing';
import * as Plotlyjs from 'plotly.js/dist/plotly.min.js';

import { PlotlyService } from './plotly.service';

describe('PlotlyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PlotlyService]
        });
    });

    it('should check the plotly dependency', () => {
        class LocalPlotlyService extends PlotlyService {
            protected get plotly() {
                return undefined;
            }

            public getPlotly() {
                return undefined;
            }
        }

        expect(() => new LocalPlotlyService()).toThrowError(`Peer dependency plotly.js isn't installed`);
    });

    it('should be created', inject([PlotlyService], (service: PlotlyService) => {
        expect(service).toBeTruthy();
    }));

    it('should return the plotly object', inject([PlotlyService], (service: PlotlyService) => {
        expect(service.getPlotly()).toBe(Plotlyjs);
    }));

    it('should call plotly.newPlot method', inject([PlotlyService], (service: PlotlyService) => {
        const plotly = service.getPlotly();

        spyOn(plotly, 'newPlot').and.returnValue(new Promise(() => {}));
        service.newPlot('one' as any, 'two' as any, 'three' as any, 'four' as any);
        expect(plotly.newPlot).toHaveBeenCalledWith('one', 'two', 'three', 'four');
    }));

    it('should call plotly.plot method', inject([PlotlyService], (service: PlotlyService) => {
        const plotly = service.getPlotly();

        spyOn(plotly, 'plot').and.returnValue(new Promise(() => {}));
        service.plot('one' as any, 'two' as any, 'three' as any, 'four' as any);
        expect(plotly.plot).toHaveBeenCalledWith('one', 'two', 'three', 'four');
    }));

    it('should call plotly.update method', inject([PlotlyService], (service: PlotlyService) => {
        const plotly = service.getPlotly();

        spyOn(plotly, 'react').and.returnValue(new Promise(() => {}));
        service.update('one' as any, 'two' as any, 'three' as any, 'four' as any);
        expect(plotly.react).toHaveBeenCalledWith('one', 'two', 'three', 'four');
    }));

    it('should call plotly.Plots.resize method', inject([PlotlyService], (service: PlotlyService) => {
        const plotly = service.getPlotly();

        spyOn(plotly.Plots, 'resize').and.returnValue(new Promise(() => {}));
        service.resize('one' as any);
        expect(plotly.Plots.resize).toHaveBeenCalledWith('one');
    }));
});
