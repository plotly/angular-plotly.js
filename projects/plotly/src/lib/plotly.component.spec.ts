import { SimpleChange, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotlyComponent } from './plotly.component';
import { PlotlyService } from './plotly.service';

import PlotlyJS from 'plotly.js-dist';


PlotlyService.setPlotly(PlotlyJS);

describe('PlotlyComponent', () => {
    let component: PlotlyComponent;
    let fixture: ComponentFixture<PlotlyComponent>;
    let componentRef: ComponentRef<PlotlyComponent>;
    let windowSpy: jasmine.SpyObj<Window>;

    beforeEach(async () => {
        windowSpy = jasmine.createSpyObj('Window', ['addEventListener', 'removeEventListener']);

        TestBed.configureTestingModule({
            imports: [PlotlyComponent],
            providers: [
                PlotlyService,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        // Other module specs intentionally exercise the service's static configuration.
        // Restore the direct Plotly dependency so test ordering cannot leak state here.
        PlotlyService.setPlotly(PlotlyJS);
        fixture = TestBed.createComponent(PlotlyComponent);
        componentRef = fixture.componentRef;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.plotEl.nativeElement).toBeDefined();
    });

    it('should receive the inner style from the property', () => {
        componentRef.setInput('innerStyle', { 'background-color': 'red' });
        fixture.detectChanges();
        expect(component.plotEl.nativeElement.style.backgroundColor).toBe('red');
    });

    it('should retain style as a deprecated compatibility alias', () => {
        componentRef.setInput('style', { 'background-color': 'red' });
        fixture.detectChanges();
        expect(component.plotEl.nativeElement.style.backgroundColor).toBe('red');
    });

    it('should prefer innerStyle when both style inputs are provided', () => {
        componentRef.setInput('style', { 'background-color': 'red' });
        componentRef.setInput('innerStyle', { 'background-color': 'blue' });
        fixture.detectChanges();
        expect(component.plotEl.nativeElement.style.backgroundColor).toBe('blue');
    });

    it('should add the id in the #plotEl', () => {
        expect(component.plotEl.nativeElement.id).toBe('');
        componentRef.setInput('divId', 'some-id');
        fixture.detectChanges();
        expect(component.plotEl.nativeElement.id).toBe('some-id');
        componentRef.setInput('divId', undefined);
        fixture.detectChanges();
        expect(component.plotEl.nativeElement.id).toBe('');
    });

    it('should update when change the revision number', () => {
        spyOn(component, 'updatePlot');

        componentRef.setInput('revision', 0);
        fixture.detectChanges();
        expect(component.updatePlot).not.toHaveBeenCalled();

        componentRef.setInput('revision', 1);
        fixture.detectChanges();
        expect(component.updatePlot).toHaveBeenCalledTimes(1);

        componentRef.setInput('revision', 2);
        fixture.detectChanges();
        expect(component.updatePlot).toHaveBeenCalledTimes(2);
    });

    it('should update the graph when the data changes', (done) => {
        spyOn(component, 'updatePlot');
        componentRef.setInput('data', [{ y: [10, 15, 13, 17], type: 'box' }]);

        component.createPlot().then(() => {
            component.ngDoCheck();
            expect(component.updatePlot).not.toHaveBeenCalled();

            componentRef.setInput('data', [{ y: [11, 15, 13, 17], type: 'box' }]);
            component.ngDoCheck();
            expect(component.updatePlot).toHaveBeenCalled();

            component.ngDoCheck();
            expect(component.updatePlot).toHaveBeenCalledTimes(1);

            component.data()[0].y[0] = 12;
            component.ngDoCheck();
            expect(component.updatePlot).toHaveBeenCalledTimes(2);
            done();
        });
    });

    it('should update the layout when the object changes', (done) => {
        spyOn(component, 'updatePlot');
        componentRef.setInput('layout', { title: 'title one' });
        component.createPlot().then(() => {
            component.ngDoCheck();
            expect(component.updatePlot).not.toHaveBeenCalled();

            componentRef.setInput('layout', { title: 'title two' });
            component.ngDoCheck();
            expect(component.updatePlot).toHaveBeenCalled();

            component.ngDoCheck();
            expect(component.updatePlot).toHaveBeenCalledTimes(1);

            component.layout()['title'] = 'title three ';
            component.ngDoCheck();
            expect(component.updatePlot).toHaveBeenCalledTimes(2);
            done();
        });
    });

    it('should add the className in #plotEl', () => {
        expect(component.getClassName()).toBe('js-plotly-plot');
        expect(component.plotEl.nativeElement.className).toBe('js-plotly-plot');

        componentRef.setInput('className', 'some-class');
        fixture.detectChanges();
        expect(component.getClassName()).toBe('js-plotly-plot some-class');
        expect(component.plotEl.nativeElement.className).toBe('js-plotly-plot some-class');

        componentRef.setInput('className', ['test2', 'test3']);
        fixture.detectChanges();
        expect(component.getClassName()).toBe('js-plotly-plot test2 test3');
        expect(component.plotEl.nativeElement.className).toBe('js-plotly-plot test2 test3');
    });

    it('should add the gd property to window when passing true to debug', (done) => {
        spyOn(component, 'getWindow').and.callFake(() => windowSpy);
        spyOn(component, 'updatePlot');

        expect(component.getWindow().gd).toBeUndefined();
        component.plotlyInstance = document.createElement('div') as any;
        componentRef.setInput('debug', true);
        fixture.detectChanges();
        component.ngOnChanges({ debug: new SimpleChange(false, component.debug(), false) });

        expect(component.updatePlot).not.toHaveBeenCalled();
        setTimeout(() => {
            expect(component.getWindow().gd).not.toBeUndefined();
            done();
        }, 13);
    });

    it('should not add the gd property when debug is false', async () => {
        spyOn(component, 'getWindow').and.callFake(() => windowSpy);
        componentRef.setInput('debug', false);

        await component.createPlot();

        expect(component.getWindow().gd).toBeUndefined();
    });

    it('should reject initialization errors after emitting them', async () => {
        const error = new Error('plot failed');
        spyOn(component.plotly, 'newPlot').and.returnValue(Promise.reject(error));
        spyOn(component.error, 'emit');
        spyOn(console, 'error');

        await expectAsync(component.createPlot()).toBeRejectedWith(error);
        expect(component.error.emit).toHaveBeenCalledWith(error);
    });

    it('should forward Plotly click events to both the current and deprecated outputs', async () => {
        const callbacks = new Map<string, (data: unknown) => void>();
        const instance = document.createElement('div') as any;
        instance.on = (name: string, callback: (data: unknown) => void) => callbacks.set(name, callback);
        spyOn(component.plotly, 'newPlot').and.resolveTo(instance);
        const currentClick = jasmine.createSpy('plotlyClick');
        const deprecatedClick = jasmine.createSpy('click');
        component.plotlyClick.subscribe(currentClick);
        component.click.subscribe(deprecatedClick);

        await component.createPlot();
        const event = { points: [{ x: 1, y: 2 }] };
        callbacks.get('plotly_click')!(event);

        expect(currentClick).toHaveBeenCalledWith(event);
        expect(deprecatedClick).toHaveBeenCalledWith(event);
    });

    it('should skip Plotly initialization on the server', () => {
        const serverComponent = TestBed.runInInjectionContext(() => new PlotlyComponent(
            component.plotly,
            component.iterableDiffers,
            component.keyValueDiffers,
            'server' as unknown as object,
        ));
        serverComponent.plotEl = { nativeElement: document.createElement('div') } as any;
        spyOn(serverComponent.plotly, 'newPlot');

        serverComponent.ngOnInit();

        expect(serverComponent.plotly.newPlot).not.toHaveBeenCalled();
        expect(() => serverComponent.ngOnDestroy()).not.toThrow();
    });

    it('should purge a plot that resolves after destruction', async () => {
        const instance = document.createElement('div') as any;
        let resolvePlot!: (value: any) => void;
        spyOn(component.plotly, 'newPlot').and.returnValue(new Promise(resolve => resolvePlot = resolve));
        spyOn(PlotlyService, 'remove');

        const pendingPlot = component.createPlot();
        component.ngOnDestroy();
        resolvePlot(instance);
        await pendingPlot;

        expect(PlotlyService.remove).toHaveBeenCalledWith(instance);
        expect(component.plotlyInstance).toBeUndefined();
    });

    it('should fail when plotlyInstance is undefined', () => {
        component.plotlyInstance = undefined;

        const error = new Error(`Plotly component wasn't initialized`);
        const fn = () => {
            component.updatePlot();
        };

        expect(fn).toThrow(error);
    });

    it('should add handler into window.resize when useResizeHandler=true', () => {
        spyOn(component, 'getWindow').and.callFake(() => windowSpy);

        expect(component.getWindow().addEventListener).not.toHaveBeenCalled();
        expect(component.resizeHandler).toBeUndefined();

        component.plotlyInstance = document.createElement('div') as any;
        componentRef.setInput('useResizeHandler', true);
        component.updateWindowResizeHandler();
        expect(component.resizeHandler).toBeDefined();

        componentRef.setInput('useResizeHandler', false);
        component.updateWindowResizeHandler();
        expect(component.resizeHandler).toBeUndefined();
    });

    it('should clear all added window events on destroy', async () => {
        const windowListenerCount = (window as any).eventListeners().length;

        // make component responsive via both the lib and the component (at least 2 window events are added)
        componentRef.setInput('layout', { title: 'responsive', autosize: true });
        componentRef.setInput('config', { responsive: true });
        componentRef.setInput('useResizeHandler', true);

        await component.createPlot();
        await fixture.whenStable();

        fixture.destroy();
        await fixture.whenStable();

        // amount of listeners should be the same as before initializing the component
        expect((window as any).eventListeners().length).toEqual(windowListenerCount);
    });

    it('should not cause errors if window is resized after a responsive chart is destroyed', async () => {

        // make component responsive via both the lib and the component
        componentRef.setInput('layout', { title: 'responsive', autosize: true });
        componentRef.setInput('config', { responsive: true });
        componentRef.setInput('useResizeHandler', true);

        await component.createPlot();
        await fixture.whenStable();

        spyOn(PlotlyJS.Plots, 'resize').and.callThrough();

        window.dispatchEvent(new Event('resize'));
        await fixture.whenStable();

        expect(PlotlyJS.Plots.resize).toHaveBeenCalled();
        PlotlyJS.Plots.resize.calls.reset();

        fixture.destroy();
        await fixture.whenStable();

        window.dispatchEvent(new Event('resize'));
        await fixture.whenStable();

        expect(PlotlyJS.Plots.resize).not.toHaveBeenCalled();
    });


    it('should not cause errors if ngOnDestroy is called before plotly is initialized', () => {
        // note that this test intentionally does not call ngOnInit/whenStable
        expect(() => component.ngOnDestroy()).not.toThrow();
    });
});
