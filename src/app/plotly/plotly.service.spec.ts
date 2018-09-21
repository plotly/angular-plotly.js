import { TestBed, inject } from '@angular/core/testing';
import * as Plotlyjs from 'plotly.js/dist/plotly.min.js';

import { PlotlyService } from './plotly.service';

describe('PlotlyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PlotlyService]
        });
    });

    it('should be created', inject([PlotlyService], (service: PlotlyService) => {
        expect(service).toBeTruthy();
    }));

    it('should return the plotly object', inject([PlotlyService], (service: PlotlyService) => {
        expect(service.getPlotly()).toBe(Plotlyjs);
    }));
});
