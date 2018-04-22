import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';

@Component({
    selector: 'plotly-line-charts',
    template: '<plotly-plot [data]="data" [layout]="layout" [revision]="0" [debug]="true" [useResizeHandler]="true"></plotly-plot>',
})
export class LineChartsComponent implements OnInit {

    public data: Plotly.Data[] = [
        { x: [1, 2, 3, 4], y: [10, 15, 13, 17], mode: 'markers', name: 'Scatter' },
        { x: [2, 3, 4, 5], y: [16, 5, 11, 9], mode: 'lines', name: 'Lines' },
        { x: [1, 2, 3, 4], y: [12, 9, 15, 12], mode: 'lines+markers', name: 'Scatter + Lines' },
    ];

    public layout: Partial<Plotly.Layout> = {
        title: 'Adding Names to Line and Scatter Plot',
    };


    constructor() { }

    ngOnInit() {
    }

}
