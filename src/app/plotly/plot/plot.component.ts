import { Component, Input, ViewChild, OnInit, OnChanges, ElementRef, SimpleChange, SimpleChanges } from '@angular/core';
import { PlotlyService } from '../plotly.service';
import { NgClass } from '@angular/common';


@Component({
    selector: 'plotly-plot',
    template: `<div #plot [attr.id]="divId" [className]="className" [ngStyle]="style"></div>`,
    providers: [PlotlyService, { provide: Window, useFactory: () => window }],
})
export class PlotComponent implements OnInit, OnChanges {

    @ViewChild('plot') plotEl: ElementRef;

    @Input() data?: Plotly.Data[];
    @Input() layout?: Partial<Plotly.Layout>;
    @Input() config?: Partial<Plotly.Config>;
    @Input() style?: { [key: string]: string };

    @Input() divId?: string;
    @Input() revision: number = 0;
    @Input() className: string = '';
    @Input() debug: boolean = false;
    @Input() useResizeHandler: boolean = false;

    public plotlyInstance: Plotly.PlotlyHTMLElement;
    public resizeHandler?: (instance: Plotly.PlotlyHTMLElement) => void;

    constructor(public plotly: PlotlyService, public window: Window) { }

    ngOnInit() {
        this.plotly.newPlot(this.plotEl.nativeElement, this.data, this.layout, this.config).then(plotlyInstance => {
            this.plotlyInstance = plotlyInstance;
            (this.window as any).gd = this.debug ? plotlyInstance : undefined;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        let shouldUpdate = false;

        const revision: SimpleChange = changes.revision;
        if (revision && !revision.isFirstChange()) {
            shouldUpdate = true;
        }

        const data: SimpleChange = changes.data;
        if (data && !data.isFirstChange()) {
            shouldUpdate = true;
        }

        const debug: SimpleChange = changes.debug;
        if (debug && !debug.isFirstChange()) {
            shouldUpdate = true;
        }

        if (shouldUpdate) {
            this.update();
        }

        this.updateWindowResizeHandler();
    }

    update() {
        if (!this.plotlyInstance) { throw new Error(`Plotly component wasn't initialized`); }
        this.plotly.plot(this.plotlyInstance, this.data, this.layout, this.config).then(plotlyInstance => {
            (this.window as any).gd = this.debug ? plotlyInstance : undefined;
        });
    }

    updateWindowResizeHandler() {
        if (this.useResizeHandler) {
            if (!this.resizeHandler) {
                this.resizeHandler = () => this.plotly.resize(this.plotlyInstance);
                this.window.addEventListener('resize', this.resizeHandler as any);
            }
        } else {
            if (typeof this.resizeHandler === 'function') {
                this.window.removeEventListener('resize', this.resizeHandler as any);
                this.resizeHandler = undefined;
            }
        }
    }

}
