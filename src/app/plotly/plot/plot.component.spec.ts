import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotComponent } from './plot.component';
import { PlotlyService } from '../plotly.service';
import { SimpleChange } from '@angular/core';


describe('PlotComponent', () => {
    let component: PlotComponent;
    let fixture: ComponentFixture<PlotComponent>;
    let plotlySpy: jasmine.SpyObj<PlotlyService>;
    let windowSpy: jasmine.SpyObj<Window>;

    beforeEach(async(() => {
        const pSpy = jasmine.createSpyObj('PlotlyService', ['newPlot', 'plot']);
        const wSpy = jasmine.createSpyObj('Window', ['addEventListener', 'removeEventListener']);

        TestBed.configureTestingModule({
            declarations: [PlotComponent],
            providers: [
                { provide: PlotlyService, useValue: pSpy },
                { provide: Window, useFactory: () => wSpy },
            ],
        }).compileComponents();

        plotlySpy = TestBed.get(PlotlyService);
        windowSpy = TestBed.get(Window);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.plotEl.nativeElement).toBeDefined();
    });

    it('should receive the style from the property', () => {
        component.style = { 'background-color': 'red' };
        fixture.detectChanges();
        expect(component.plotEl.nativeElement.style.backgroundColor).toBe('red');
    });

    it('should add the id in the #plotEl', () => {
        expect(component.plotEl.nativeElement.id).toBe('');
        component.divId = 'some-id';
        fixture.detectChanges();
        expect(component.plotEl.nativeElement.id).toBe('some-id');
        component.divId = undefined;
        fixture.detectChanges();
        expect(component.plotEl.nativeElement.id).toBe('');
    });

    it('should update when change the revision number', () => {
        spyOn(component, 'update');

        component.revision = 0;
        component.ngOnChanges({'revision': new SimpleChange(null, component.revision, true)});
        fixture.detectChanges();
        expect(component.update).not.toHaveBeenCalled();

        component.revision = 1;
        component.ngOnChanges({'revision': new SimpleChange(0, component.revision, false)});
        fixture.detectChanges();
        expect(component.update).toHaveBeenCalled();

        component.revision = 2;
        component.ngOnChanges({'revision': new SimpleChange(1, component.revision, false)});
        fixture.detectChanges();
        expect(component.update).toHaveBeenCalledTimes(2);
    });

    it('should update the graph when the data changes', () => {
        spyOn(component, 'update');
        expect(component.update).not.toHaveBeenCalled();

        component.data = [{ y: [10, 15, 13, 17], type: 'box' }];
        component.ngOnChanges({'data': new SimpleChange(null, component.data, false)});
        fixture.detectChanges();

        expect(component.update).toHaveBeenCalled();
    });

    it('should add the className in #plotEl', () => {
        expect(component.plotEl.nativeElement.className).toBe('');
        component.className = 'some-class';
        fixture.detectChanges();
        expect(component.plotEl.nativeElement.className).toBe('some-class');
    });

    it('should add the gd property to window when passing true to debug', () => {
        spyOn(component, 'update').and.callFake(() => {
            (component.window as any).gd = this.debug ? {} : undefined;
        });

        expect((windowSpy as any).gd).toBeUndefined();
        component.plotlyInstance = document.createElement('div') as any;
        component.debug = true;
        component.ngOnChanges({'debug': new SimpleChange(false, component.debug, false)});
        fixture.detectChanges();

        expect((windowSpy as any).gd).toBeDefined();
        expect(component.update).toHaveBeenCalled();
    });

    it('should add handler into window.resize when useResizeHandler=true', () => {
        expect(windowSpy.addEventListener).not.toHaveBeenCalled();
        expect(component.resizeHandler).toBeUndefined();

        component.useResizeHandler = true;
        component.updateWindowResizeHandler();
        expect(component.resizeHandler).toBeDefined();
        expect(windowSpy.addEventListener).toHaveBeenCalledWith('resize', component.resizeHandler);
        const cache_resizeHandler = component.resizeHandler;

        component.useResizeHandler = false;
        component.updateWindowResizeHandler();
        expect(component.resizeHandler).toBeUndefined();
        expect(windowSpy.removeEventListener).toHaveBeenCalledWith('resize', cache_resizeHandler);
    });
});
