import { PlotlyModule } from './plotly.module';
import { PlotlyService } from './plotly.service';

describe('PlotlyModule', () => {
    afterEach(() => {
        PlotlyService.plotly = undefined;
    });

    // it('should throw error when PlotlyJS object is invalid', () => {
    //     expect(() => new PlotlyModule()).toThrowError(
    //         'Invalid PlotlyJS object. Please check https://github.com/plotly/angular-plotly.js#quick-start to see how to add PlotlyJS to your project.'
    //     );
    // });

    it('should not throw error when plotlyjs has plot function', () => {
        PlotlyService.plotly = { plot(): void {} };
        expect(() => new PlotlyModule()).not.toThrow();
    });

    it('should not throw error when plotlyjs has newPlot function', () => {
        PlotlyService.plotly = { newPlot(): void {} };
        expect(() => new PlotlyModule()).not.toThrow();
    });

    describe('forRoot', () => {
        it('should call PlotlyService.setPlotly with provided plotlyjs and return module config', () => {
            const fakePlotly = { react(): void {} };
            spyOn(PlotlyService, 'setPlotly');
            const result = PlotlyModule.forRoot(fakePlotly);
            expect(PlotlyService.setPlotly).toHaveBeenCalledWith(fakePlotly);
            expect(result.ngModule).toBe(PlotlyModule);
            expect(result.providers).toEqual([PlotlyService]);
        });
    });
});