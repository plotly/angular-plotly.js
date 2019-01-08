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

    it('should call plotly methods', inject([PlotlyService], (service: PlotlyService) => {
        const methods: (keyof PlotlyService)[] = ['plot', 'update', 'newPlot'];
        methods.forEach(methodName => {
            spyOn(service, methodName);

            (service as any)[methodName]('one' as any, 'two' as any, 'three' as any, 'four' as any);
            expect(service[methodName]).toHaveBeenCalledWith('one', 'two', 'three', 'four');
        });

        spyOn(service.getPlotly().Plots, 'resize');
        service.resize('one' as any);
        expect(service.getPlotly().Plots.resize).toHaveBeenCalledWith('one');
    }));


});
