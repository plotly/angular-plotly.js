import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnChanges,
    OnInit,
    Output,
    SimpleChange,
    SimpleChanges,
    ViewChild,
    DoCheck,
    IterableDiffers,
    KeyValueDiffer,
    KeyValueDiffers,
    IterableDiffer,
} from '@angular/core';

import { PlotlyService } from '../plotly.service';
import { NgClass } from '@angular/common';

// @dynamic
@Component({
    selector: 'plotly-plot',
    template: `<div #plot [attr.id]="divId" [className]="getClassName()" [ngStyle]="style"></div>`,
    providers: [PlotlyService],
})
export class PlotComponent implements OnInit, OnChanges, OnDestroy, DoCheck {
    protected defaultClassName = 'js-plotly-plot';

    @ViewChild('plot') plotEl: ElementRef;

    @Input() data?: Plotly.Data[];
    @Input() layout?: Partial<Plotly.Layout>;
    @Input() config?: Partial<Plotly.Config>;
    @Input() style?: { [key: string]: string };

    @Input() divId?: string;
    @Input() revision: number = 0;
    @Input() className?: string | string[];
    @Input() debug: boolean = false;
    @Input() useResizeHandler: boolean = false;

    @Output() initialized = new EventEmitter<Plotly.Figure>();
    @Output() update = new EventEmitter<Plotly.Figure>();
    @Output() purge = new EventEmitter<Plotly.Figure>();
    @Output() error = new EventEmitter<Error>();

    public plotlyInstance: Plotly.PlotlyHTMLElement;
    public resizeHandler?: (instance: Plotly.PlotlyHTMLElement) => void;
    public layoutDiffer: KeyValueDiffer<string, any>;
    public prevData?: string;

    constructor(
        public plotly: PlotlyService,
        public differ: IterableDiffers,
        public keyValueDiffers: KeyValueDiffers,
    ) {}

    ngOnInit() {
        this.plotly.newPlot(this.plotEl.nativeElement, this.data, this.layout, this.config).then(plotlyInstance => {
            this.plotlyInstance = plotlyInstance;
            this.getWindow().gd = this.debug ? plotlyInstance : undefined;

            this.updateWindowResizeHandler();
            const figure = this.createFigure();
            this.initialized.emit(figure);
        }, err => {
            console.error('Error while plotting:', err);
            this.error.emit(err);
        });
    }

    ngOnDestroy() {
        if (typeof this.resizeHandler === 'function') {
            this.getWindow().removeEventListener('resize', this.resizeHandler as any);
            this.resizeHandler = undefined;
        }

        const figure = this.createFigure();
        this.purge.emit(figure);
    }

    ngOnChanges(changes: SimpleChanges) {
        let shouldUpdate = false;

        const revision: SimpleChange = changes.revision;
        if (revision && !revision.isFirstChange()) {
            shouldUpdate = true;
        }

        const debug: SimpleChange = changes.debug;
        if (debug && !debug.isFirstChange()) {
            shouldUpdate = true;
        }

        if (shouldUpdate) {
            this.redraw();
        }

        this.updateWindowResizeHandler();
    }

    ngDoCheck() {
        let shouldUpdate = false;

        if (this.layoutDiffer) {
            const layoutHasDiff = this.layoutDiffer.diff(this.layout);
            if (layoutHasDiff) {
                shouldUpdate = true;
            }
        } else if (this.layout) {
            this.layoutDiffer = this.keyValueDiffers.find(this.layout).create();
            shouldUpdate = true;
        }

        if (this.prevData) {
            const currentData = JSON.stringify(this.data);
            if (currentData !== this.prevData) {
                shouldUpdate = true;
                this.prevData = currentData;
            }
        } else if (Array.isArray(this.data)) {
            this.prevData = JSON.stringify(this.data);
            shouldUpdate = true;
        }

        if (shouldUpdate) {
            this.redraw();
        }
    }

    getWindow(): any {
        return window;
    }

    getClassName(): string {
        let classes = [this.defaultClassName];

        if (Array.isArray(this.className)) {
            classes = classes.concat(this.className);
        } else if (this.className) {
            classes.push(this.className);
        }

        return classes.join(' ');
    }

    createFigure(): Plotly.Figure {
        const p: any = this.plotlyInstance;
        const figure: Plotly.Figure = {
            data: p.data,
            layout: p.layout,
            frames: p._transitionData ? p._transitionData._frames : null
        };

        return figure;
    }

    redraw() {
        if (!this.plotlyInstance) {
            const error = new Error(`Plotly component wasn't initialized`);
            this.error.emit(error);
            throw error;
        }

        this.plotly.plot(this.plotlyInstance, this.data, this.layout, this.config).then(plotlyInstance => {
            this.update.emit(this.createFigure());
            this.getWindow().gd = this.debug ? plotlyInstance : undefined;
        });
    }

    updateWindowResizeHandler() {
        if (this.useResizeHandler) {
            if (this.resizeHandler === undefined) {
                this.resizeHandler = () => this.plotly.resize(this.plotlyInstance);
                this.getWindow().addEventListener('resize', this.resizeHandler as any);
            }
        } else {
            if (typeof this.resizeHandler === 'function') {
                this.getWindow().removeEventListener('resize', this.resizeHandler as any);
                this.resizeHandler = undefined;
            }
        }
    }

    dataDifferTrackBy(index: number, item: any): any {
        return JSON.stringify(item);
    }

}
