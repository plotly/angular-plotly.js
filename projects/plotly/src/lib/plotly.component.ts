/* eslint-disable @angular-eslint/no-conflicting-lifecycle */

import {
    Component,
    ElementRef,
    OnDestroy,
    OnChanges,
    OnInit,
    SimpleChange,
    SimpleChanges,
    ViewChild,
    DoCheck,
    IterableDiffer,
    IterableDiffers,
    KeyValueDiffer,
    KeyValueDiffers,
    input,
    output,
    OutputEmitterRef,
} from '@angular/core';

import { PlotlyService } from './plotly.service';
import { PlotlyThemeLoaderService, PlotlyTheme } from './plotly.theme-loader.service';
import { Plotly } from './plotly.interface';

// @dynamic
@Component({
    selector: 'plotly-plot',
    template: `<div #plot [attr.id]="divId()" [ngClass]="getClassName()" [ngStyle]="style()">
      <ng-content></ng-content>
    </div>`,
    providers: [PlotlyService],
    standalone: false
})
export class PlotlyComponent implements OnInit, OnChanges, OnDestroy, DoCheck {
    protected defaultClassName = 'js-plotly-plot';

    public plotlyInstance?: Plotly.PlotlyHTMLElement;
    public resizeHandler?: (instance: Plotly.PlotlyHTMLElement) => void;
    public layoutDiffer?: KeyValueDiffer<string, any>;
    public dataDiffer?: IterableDiffer<Plotly.Data>;

    @ViewChild('plot', { static: true }) plotEl!: ElementRef;

    data = input<Plotly.Data[]>();
    layout = input<Partial<Plotly.Layout>>();
    config = input<Partial<Plotly.Config>>();
    frames = input<Partial<Plotly.Config>[]>();
    style = input<{ [key: string]: string }>();
    theme = input<PlotlyTheme>('none');

    divId = input<string>();
    revision = input(0);
    className = input<string | string[]>();
    debug = input(false);
    useResizeHandler = input(false);

    updateOnLayoutChange = input(true);
    updateOnDataChange = input(true);
    updateOnlyWithRevision = input(false);

    initialized = output<Plotly.Figure>();
    update = output<Plotly.Figure>();
    purge = output<Plotly.Figure>();
    error = output<Error>();

    afterExport = output();
    afterPlot = output();
    animated = output();
    animatingFrame = output();
    animationInterrupted = output();
    autoSize = output();
    beforeExport = output();
    beforeHover = output();
    buttonClicked = output();
    /**
     * @deprecated DEPRECATED: Reconsider using `(plotlyClick)` instead of `(click)` to avoid event conflict. Please check https://github.com/plotly/angular-plotly.js#FAQ
     */
    click = output();
    plotlyClick = output();
    clickAnnotation = output();
    deselect = output();
    doubleClick = output();
    framework = output();
    hover = output();
    legendClick = output();
    legendDoubleClick = output();
    /**
     * @deprecated DEPRECATED: Event react is not list as an plotly.js event
     */
    react = output();
    relayout = output();
    relayouting = output();
    restyle = output();
    redraw = output();
    selected = output();
    selecting = output();
    sliderChange = output();
    sliderEnd = output();
    sliderStart = output();
    sunburstclick = output();
    transitioning = output();
    transitionInterrupted = output();
    unhover = output();
    /**
     * @deprecated DEPRECATED: Event treemapclick is not list as an plotly.js event
     */
    treemapclick = output();
    webglcontextlost = output();


    public eventNames = ['afterExport', 'afterPlot', 'animated', 'animatingFrame', 'animationInterrupted', 'autoSize',
        'beforeExport', 'beforeHover', 'buttonClicked', 'clickAnnotation', 'deselect', 'doubleClick', 'framework', 'hover',
        'legendClick', 'legendDoubleClick', 'react', 'relayout', 'relayouting',  'restyle', 'redraw', 'selected', 'selecting', 'sliderChange',
        'sliderEnd', 'sliderStart', 'sunburstclick', 'transitioning', 'transitionInterrupted', 'unhover', 'treemapclick', 'webglcontextlost'];

    constructor(
        public plotly: PlotlyService,
        public themeLoader: PlotlyThemeLoaderService,
        public iterableDiffers: IterableDiffers,
        public keyValueDiffers: KeyValueDiffers,
    ) { }

    ngOnInit(): void {
        this.createPlot().then(() => {
            const figure = this.createFigure();
            this.initialized.emit(figure);
        });        
    }

    ngOnDestroy(): void {
        if (typeof this.resizeHandler === 'function') {
            this.getWindow().removeEventListener('resize', this.resizeHandler as any);
            this.resizeHandler = undefined;
        }

        if (this.plotlyInstance) {
            const figure = this.createFigure();
            this.purge.emit(figure);
            PlotlyService.remove(this.plotlyInstance);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        let shouldUpdate = false;

        const revision: SimpleChange = changes['revision'];
        if (revision && !revision.isFirstChange()) {
            shouldUpdate = true;
        }

        const debug: SimpleChange = changes['debug'];
        if (debug && !debug.isFirstChange()) {
            shouldUpdate = true;
        }

        if (shouldUpdate) {
            this.updatePlot();
        }

        this.updateWindowResizeHandler();
    }

    ngDoCheck(): boolean | void {
        if (this.updateOnlyWithRevision()) {
            return false;
        }

        let shouldUpdate = false;

        if (this.updateOnLayoutChange()) {
            if (this.layoutDiffer) {
                const layoutHasDiff = this.layoutDiffer.diff(this.layout()!);
                if (layoutHasDiff) {
                    shouldUpdate = true;
                }
            } else if (this.layout()) {
                this.layoutDiffer = this.keyValueDiffers.find(this.layout()).create();
            } else {
                this.layoutDiffer = undefined;
            }
        }

        if (this.updateOnDataChange()) {
            if (this.dataDiffer) {
                const dataHasDiff = this.dataDiffer.diff(this.data());
                if (dataHasDiff) {
                    shouldUpdate = true;
                }
            } else if (Array.isArray(this.data())) {
                this.dataDiffer = this.iterableDiffers.find(this.data()).create(this.dataDifferTrackBy);
            } else {
                this.dataDiffer = undefined;
            }
        }

        if (shouldUpdate && this.plotlyInstance) {
            this.updatePlot();
        }
    }

    getData(): Plotly.Data[] {
        return this.data() ?? [];
    }

    getWindow(): any {
        return window;
    }

    getClassName(): string {
        let classes = [this.defaultClassName];
        const className = this.className();

        if (Array.isArray(className)) {
            classes = classes.concat(className);
        } else if (className) {
            classes.push(className);
        }

        return classes.join(' ');
    }

    createPlot(): Promise<void> {
        return this.plotly.newPlot(
            this.plotEl.nativeElement,
            this.getData(),
            this.layout(),
            this.config(),
            this.frames()
        ).then(plotlyInstance => {
            this.plotlyInstance = plotlyInstance;
            this.getWindow().gd = this.debug ? plotlyInstance : undefined;

            this.eventNames.forEach(name => {
                const eventName = `plotly_${name.toLowerCase()}`;
                const event = (this as any)[name] as OutputEmitterRef<any>;

                plotlyInstance.on(eventName, (data: any) => event.emit(data));
            });

            plotlyInstance.on('plotly_click', (data: any) => {
                this.plotlyClick.emit(data);
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

    updatePlot(): Promise<any> {
        if (!this.plotlyInstance) {
            const error = new Error(`Plotly component wasn't initialized`);
            this.error.emit(error);
            throw error;
        }

        const layout = { ...this.layout() };

        return this.plotly.update(
            this.plotlyInstance,
            this.getData(),
            layout,
            this.config(),
            this.frames()
        ).then(() => {
            const figure = this.createFigure();
            this.update.emit(figure);
        }, err => {
            console.error('Error while updating plot:', err);
            this.error.emit(err);
        });
    }

    updateWindowResizeHandler(): void {
        if (this.useResizeHandler()) {
            if (this.resizeHandler === undefined) {
                this.resizeHandler = () => this.plotly.resize(this.plotlyInstance!);
                this.getWindow().addEventListener('resize', this.resizeHandler as any);
            }
        } else {
            if (typeof this.resizeHandler === 'function') {
                this.getWindow().removeEventListener('resize', this.resizeHandler as any);
                this.resizeHandler = undefined;
            }
        }
    }

    dataDifferTrackBy(_: number, item: any): unknown {
        const obj = Object.assign({}, item, { uid: '' });
        return JSON.stringify(obj);
    }

}
