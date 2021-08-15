import { PlotlyModule } from './plotly.module';


describe('PlotlyModule', () => {

    it('should create', () => {
        const fn = () => {
            const mod = new PlotlyModule();
        };

        const msg = 'Invalid PlotlyJS object. Please check https://github.com/plotly/angular-plotly.js#quick-start'
                  + ' to see how to add PlotlyJS to your project.';
        expect(fn).toThrowError(msg);


        const fn2 = () => {
            PlotlyModule.plotlyjs = {
                plot(): void {}
            };
            const mod = new PlotlyModule();
        };

        expect(fn2).not.toThrowError(msg);
    });

});
