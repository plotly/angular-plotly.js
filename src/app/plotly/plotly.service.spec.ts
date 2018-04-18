import { TestBed, inject } from '@angular/core/testing';

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
});
