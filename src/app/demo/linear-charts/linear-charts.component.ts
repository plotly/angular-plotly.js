import { Component } from '@angular/core';

@Component({
    selector: 'plotly-line-charts',
    templateUrl: './linear-charts.component.html',
})
export class LinearChartsComponent {
    public debug = true;
    public useResizeHandler = true;

    public data: any[] = [
        { x: [1, 2, 3, 4], y: [10, 15, 13, 17], type: 'bar',  mode: 'markers', name: 'Scatter' },
        { x: [2, 3, 4, 5], y: [16, 5, 11, 9], type: 'scattergl', mode: 'lines', name: 'Lines' },
        { x: [1, 2, 3, 4], y: [12, 9, 15, 12], type: 'markers', mode: 'lines+markers', name: 'Scatter + Lines' },
        { x: [4, 2, 3, 1], y: [9, 12, 17, 13], type: 'bar', mode: 'lines+markers', name: 'Scatter + Lines' },
    ];

    public layout: any = {
        title: 'Adding Names to Line and Scatter Plot',
    };

    public addRandomLine() {
        const line: any = { x: [], y: [], mode: 'lines', name: 'Line ' + this.data.length };

        line.x = [1, 2, 3, 4].map(i => Math.round(Math.random() * 10));
        line.y = [1, 2, 3, 4].map(i => Math.round(Math.random() * 20));
        line.mode = ['markers', 'lines', 'lines+markers'][Math.floor(Math.random() * 3)] as any;

        this.data.push(line);
    }
}
