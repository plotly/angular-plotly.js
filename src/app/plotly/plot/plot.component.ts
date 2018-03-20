import { Component, Input, ViewChild, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';

@Component({
    selector: 'plotly-plot',
    template: `<div #plot [ngStyle]="style"></div>`,
})
export class PlotComponent implements OnInit {

    constructor() { }

    @ViewChild('plot') plotEl;

    @Input() data: Plotly.Data[];
    @Input() layout: Partial<Plotly.Layout>;
    @Input() config: Partial<Plotly.Config>;
    @Input() style: {[key: string]: string};

    private plotlyInstance: Plotly.PlotlyHTMLElement;

    ngOnInit() {
        Plotly.newPlot(this.plotEl.nativeElement, this.data, this.layout, this.config).then(plotlyInstance => {
            this.plotlyInstance = plotlyInstance;
        });
    }

}
