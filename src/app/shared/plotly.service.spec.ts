import { TestBed, inject } from '@angular/core/testing';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';

import { PlotlyService } from './plotly.service';
import { Plotly } from './plotly.interface';

describe('PlotlyService', () => {
    beforeEach(() => {
        PlotlyService.setPlotly(PlotlyJS);
        TestBed.configureTestingModule({
            providers: [PlotlyService]
        });
    });

    it('should get a plotly instance by id', inject([PlotlyService], (service: PlotlyService) => {
        const instance = { id: 'aidi' } as Plotly.PlotlyHTMLElement;

        PlotlyService.insert(instance);
        expect(service.getInstanceByDivId('aidi')).toBe(instance);

        PlotlyService.remove(instance);
        expect(service.getInstanceByDivId('aidi')).toBeUndefined();
    }));

    it('should check the plotly dependency', inject([PlotlyService], (service: PlotlyService) => {
        PlotlyService.setPlotly(undefined);
        expect(() => service.getPlotly()).toThrowError(`Peer dependency plotly.js isn't installed`);
        PlotlyService.setPlotly(PlotlyJS);
    }));

    it('should be created', inject([PlotlyService], (service: PlotlyService) => {
        expect(service).toBeTruthy();
    }));

    it('should return the plotly object', inject([PlotlyService], (service: PlotlyService) => {
        expect(service.getPlotly()).toBe(PlotlyJS);
    }));

    it('should call plotly.newPlot method', inject([PlotlyService], async (service: PlotlyService) => {
        return new Promise(async (resolve) => {
            const plotly = service.getPlotly();
            PlotlyService.setPlotly('waiting');

            setTimeout(() => PlotlyService.setPlotly(PlotlyJS), 100);

            spyOn(plotly, 'newPlot').and.returnValue(Promise.resolve());
            await service.newPlot('one' as any, 'two' as any, 'three' as any, 'four' as any);
            expect(plotly.newPlot).toHaveBeenCalledWith('one', 'two', 'three', 'four');

            await service.newPlot('one' as any, 'two' as any, 'three' as any, 'four' as any, 'five' as any);
            expect(plotly.newPlot).toHaveBeenCalledWith('one', {data: 'two', layout: 'three', config: 'four', frames: 'five'});
            resolve();
        });
    }));

    it('should call plotly.plot method', inject([PlotlyService], (service: PlotlyService) => {
        const plotly = service.getPlotly();

        spyOn(plotly, 'plot').and.returnValue(new Promise(() => {}));
        service.plot('one' as any, 'two' as any, 'three' as any, 'four' as any);
        expect(plotly.plot).toHaveBeenCalledWith('one', 'two', 'three', 'four');

        service.plot('one' as any, 'two' as any, 'three' as any, 'four' as any, 'five' as any);
        expect(plotly.plot).toHaveBeenCalledWith('one', {data: 'two', layout: 'three', config: 'four', frames: 'five'});
    }));

    it('should call plotly.update method', inject([PlotlyService], (service: PlotlyService) => {
        const plotly = service.getPlotly();

        spyOn(plotly, 'react').and.returnValue(new Promise(() => {}));
        service.update('one' as any, 'two' as any, 'three' as any, 'four' as any);
        expect(plotly.react).toHaveBeenCalledWith('one', 'two', 'three', 'four');

        service.update('one' as any, 'two' as any, 'three' as any, 'four' as any, 'five' as any);
        expect(plotly.react).toHaveBeenCalledWith('one', {data: 'two', layout: 'three', config: 'four', frames: 'five'});
    }));

    it('should call plotly.Plots.resize method', inject([PlotlyService], (service: PlotlyService) => {
        const plotly = service.getPlotly();

        spyOn(plotly.Plots, 'resize').and.returnValue(new Promise(() => {}));
        service.resize('one' as any);
        expect(plotly.Plots.resize).toHaveBeenCalledWith('one');
    }));
});
