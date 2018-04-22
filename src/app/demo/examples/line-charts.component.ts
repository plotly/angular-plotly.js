import { Component } from '@angular/core';
import Example from './example.component';

@Component({
    selector: 'plotly-line-charts',
    templateUrl: './template.html',
})
export class LineChartsComponent extends Example {

    public data: Plotly.Data[] = [
        { x: [1, 2, 3, 4], y: [10, 15, 13, 17], mode: 'markers', name: 'Scatter' },
        { x: [2, 3, 4, 5], y: [16, 5, 11, 9], mode: 'lines', name: 'Lines' },
        { x: [1, 2, 3, 4], y: [12, 9, 15, 12], mode: 'lines+markers', name: 'Scatter + Lines' },
    ];

    public layout: Partial<Plotly.Layout> = {
        title: 'Adding Names to Line and Scatter Plot',
    };
}
