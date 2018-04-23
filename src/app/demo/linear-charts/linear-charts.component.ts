import { Component } from '@angular/core';

@Component({
    selector: 'plotly-line-charts',
    templateUrl: './linear-charts.component.html',
})
export class LinearChartsComponent {
    public debug = true;
    public useResizeHandler = true;

    public data: Plotly.Data[] = [
        { x: [1, 2, 3, 4], y: [10, 15, 13, 17], mode: 'markers', name: 'Scatter' },
        { x: [2, 3, 4, 5], y: [16, 5, 11, 9], mode: 'lines', name: 'Lines' },
        { x: [1, 2, 3, 4], y: [12, 9, 15, 12], mode: 'lines+markers', name: 'Scatter + Lines' },
    ];

    public layout: Partial<Plotly.Layout> = {
        title: 'Adding Names to Line and Scatter Plot',
    };

    public addRandomLine() {
        const line: Plotly.Data = { x: [], y: [], mode: 'lines', name: 'Line ' + this.data.length };

        line.x = [1, 2, 3, 4].map(i => Math.round(Math.random() * 10));
        line.y = [1, 2, 3, 4].map(i => Math.round(Math.random() * 20));

        this.data.push(line);
    }
}
