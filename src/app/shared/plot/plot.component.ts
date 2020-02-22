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
    IterableDiffer,
    IterableDiffers,
    KeyValueDiffer,
    KeyValueDiffers,
    ChangeDetectionStrategy,
} from '@angular/core';

import { PlotlyService } from '../plotly.service';
import { Plotly } from '../plotly.interface';

// @dynamic
@Component({
    selector: 'plotly-plot',
    template: `<div #plot [attr.id]="divId" [className]="getClassName()" [ngStyle]="style"></div>`,
    providers: [PlotlyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlotComponent implements OnInit, OnChanges, OnDestroy, DoCheck {
    protected defaultClassName = 'js-plotly-plot';

    public plotlyInstance: Plotly.PlotlyHTMLElement;
    public resizeHandler?: (instance: Plotly.PlotlyHTMLElement) => void;
    public layoutDiffer: KeyValueDiffer<string, any>;
    public dataDiffer: IterableDiffer<Plotly.Data>;

    @ViewChild('plot', {static: true}) plotEl: ElementRef;

    @Input() data?: Plotly.Data[];
    @Input() layout?: Partial<Plotly.Layout>;
    @Input() config?: Partial<Plotly.Config>;
    @Input() frames?: Partial<Plotly.Config>[];
    @Input() style?: { [key: string]: string };

    @Input() divId?: string;
    @Input() revision: number = 0;
    @Input() className?: string | string[];
    @Input() debug: boolean = false;
    @Input() useResizeHandler: boolean = false;

    @Input() updateOnLayoutChange = true;
    @Input() updateOnDataChange = true;
    @Input() updateOnlyWithRevision = false;

    @Output() ngInited = new EventEmitter();
    @Output() initialized = new EventEmitter<Plotly.Figure>();
    @Output() update = new EventEmitter<Plotly.Figure>();
    @Output() purge = new EventEmitter<Plotly.Figure>();
    @Output() error = new EventEmitter<Error>();

    @Output() afterExport = new EventEmitter();
    @Output() afterPlot = new EventEmitter();
    @Output() animated = new EventEmitter();
    @Output() animatingFrame = new EventEmitter();
    @Output() animationInterrupted = new EventEmitter();
    @Output() autoSize = new EventEmitter();
    @Output() beforeExport = new EventEmitter();
    @Output() buttonClicked = new EventEmitter();
    @Output() click = new EventEmitter();
    @Output() plotly_click = new EventEmitter();
    @Output() clickAnnotation = new EventEmitter();
    @Output() deselect = new EventEmitter();
    @Output() doubleClick = new EventEmitter();
    @Output() framework = new EventEmitter();
    @Output() hover = new EventEmitter();
    @Output() legendClick = new EventEmitter();
    @Output() legendDoubleClick = new EventEmitter();
    @Output() relayout = new EventEmitter();
    @Output() restyle = new EventEmitter();
    @Output() redraw = new EventEmitter();
    @Output() selected = new EventEmitter();
    @Output() selecting = new EventEmitter();
    @Output() sliderChange = new EventEmitter();
    @Output() sliderEnd = new EventEmitter();
    @Output() sliderStart = new EventEmitter();
    @Output() transitioning = new EventEmitter();
    @Output() transitionInterrupted = new EventEmitter();
    @Output() unhover = new EventEmitter();
    @Output() relayouting = new EventEmitter();

    public eventNames = ['afterExport', 'afterPlot', 'animated', 'animatingFrame', 'animationInterrupted', 'autoSize',
        'beforeExport', 'buttonClicked', 'clickAnnotation', 'deselect', 'doubleClick', 'framework', 'hover',
        'legendClick', 'legendDoubleClick', 'relayout', 'restyle', 'redraw', 'selected', 'selecting', 'sliderChange',
        'sliderEnd', 'sliderStart', 'transitioning', 'transitionInterrupted', 'unhover', 'relayouting'];

    constructor(
        public plotly: PlotlyService,
        public iterableDiffers: IterableDiffers,
        public keyValueDiffers: KeyValueDiffers,
    ) { }

    ngOnInit() {
        this.ngInited.emit();
        setTimeout(async () => {
            await this.createPlot();
            const figure = this.createFigure();
            this.initialized.emit(figure);
        });


        if (this.plotly.debug && this.click.observers.length > 0) {
            const msg = 'DEPRECATED: Reconsider using `(plotly_click)` instead of `(click)` to avoid event conflict. '
                + 'Please check https://github.com/plotly/angular-plotly.js#FAQ';
            console.error(msg);
        }
    }

    ngOnDestroy() {
        if (typeof this.resizeHandler === 'function') {
            this.getWindow().removeEventListener('resize', this.resizeHandler as any);
            this.resizeHandler = undefined;
        }

        const figure = this.createFigure();
        this.purge.emit(figure);
        PlotlyService.remove(this.plotlyInstance);
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
            this.updatePlot();
        }

        this.updateWindowResizeHandler();
    }

    ngDoCheck() {
        if (this.updateOnlyWithRevision) {
            return false;
        }

        let shouldUpdate = false;

        if (this.updateOnLayoutChange) {
            if (this.layoutDiffer) {
                const layoutHasDiff = this.layoutDiffer.diff(this.layout);
                if (layoutHasDiff) {
                    shouldUpdate = true;
                }
            } else if (this.layout) {
                this.layoutDiffer = this.keyValueDiffers.find(this.layout).create();
            } else {
                this.layoutDiffer = undefined;
            }
        }

        if (this.updateOnDataChange) {
            if (this.dataDiffer) {
                const dataHasDiff = this.dataDiffer.diff(this.data);
                if (dataHasDiff) {
                    shouldUpdate = true;
                }
            } else if (Array.isArray(this.data)) {
                this.dataDiffer = this.iterableDiffers.find(this.data).create(this.dataDifferTrackBy);
            } else {
                this.dataDiffer = undefined;
            }
        }

        if (shouldUpdate && this.plotlyInstance) {
            this.updatePlot();
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

    createPlot(): Promise<void> {
        return this.plotly.newPlot(this.plotEl.nativeElement, this.data, this.layout, this.config, this.frames).then(plotlyInstance => {
            this.plotlyInstance = plotlyInstance;
            this.getWindow().gd = this.debug ? plotlyInstance : undefined;

            this.eventNames.forEach(name => {
                const eventName = `plotly_${name.toLowerCase()}`;
                plotlyInstance.on(eventName, (data: any) => (this[name] as EventEmitter<void>).emit(data));
            });

            plotlyInstance.on('plotly_click', (data: any) => {
                this.click.emit(data);
                this.plotly_click.emit(data);
            });

            this.updateWindowResizeHandler();
        }, err => {
            console.error('Error while plotting:', err);
            this.error.emit(err);
        });
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

    updatePlot() {
        if (!this.plotlyInstance) {
            const error = new Error(`Plotly component wasn't initialized`);
            this.error.emit(error);
            throw error;
        }

        const layout = {...this.layout};

        return this.plotly.update(this.plotlyInstance, this.data, layout, this.config, this.frames).then(() => {
            const figure = this.createFigure();
            this.update.emit(figure);
        }, err => {
            console.error('Error while updating plot:', err);
            this.error.emit(err);
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

    dataDifferTrackBy(_: number, item: any): any {
        const obj = Object.assign({}, item, { uid: '' });
        return JSON.stringify(obj);
    }

}
