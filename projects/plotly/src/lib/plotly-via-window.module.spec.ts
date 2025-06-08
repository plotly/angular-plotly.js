import { PlotlyViaWindowModule } from './plotly-via-window.module';
import { PlotlyService } from './plotly.service';

describe('PlotlyViaWindowModule', () => {
    const originalPlotly = (window as any).Plotly;

    afterEach(() => {
        (window as any).Plotly = originalPlotly;
    });

    it('should throw error when window.Plotly is undefined', () => {
        delete (window as any).Plotly;
        expect(() => new PlotlyViaWindowModule())
            .toThrowError('Plotly object not found on window.');
    });

    it('should set PlotlyService.setPlotly with window.Plotly', () => {
        const fakePlotly = { react(): void { } };
        (window as any).Plotly = fakePlotly;
        spyOn(PlotlyService, 'setPlotly');
        new PlotlyViaWindowModule();
        expect(PlotlyService.setPlotly).toHaveBeenCalledWith(fakePlotly);
    });
});