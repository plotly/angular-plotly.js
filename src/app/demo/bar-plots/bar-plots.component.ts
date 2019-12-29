import { Component } from '@angular/core';

@Component({
    selector: 'plotly-bar-plot',
    templateUrl: './bar-plots.component.html',
})
export class BarPlotComponent {
    public debug = true;
    public useResizeHandler = true;

    public barPlot = {
        data: [
            { y: [10, 15, 13, 17], type: 'bar' },
            { y: [16, 5, 11, 9], type: 'bar' },
        ],
        layout: {
            title: 'Simple Bar Plot',
        }
    };

    public horizontalBarPlot = {
        data: [
            { x: [1, 2, 3, 4, 4, 4, 8, 9, 10], type: 'bar', name: 'Set 1' },
            { x: [2, 3, 3, 3, 3, 5, 6, 6, 7], type: 'bar', name: 'Set 2' },
        ],
        layout: {
            title: 'Horizontal Bar Plot',
        },
    };

    private x = ['day 1', 'day 1', 'day 1', 'day 1', 'day 1', 'day 1',
        'day 2', 'day 2', 'day 2', 'day 2', 'day 2', 'day 2'];

    public groupedBarPlot = {
        data: [{
            y: [0.2, 0.2, 0.6, 1.0, 0.5, 0.4, 0.2, 0.7, 0.9, 0.1, 0.5, 0.3],
            x: this.x,
            name: 'kale',
            marker: { color: '#3D9970' },
            type: 'bar'
        },
        {
            y: [0.6, 0.7, 0.3, 0.6, 0.0, 0.5, 0.7, 0.9, 0.5, 0.8, 0.7, 0.2],
            x: this.x,
            name: 'radishes',
            marker: { color: '#FF4136' },
            type: 'bar'
        },
        {
            y: [0.1, 0.3, 0.1, 0.9, 0.6, 0.6, 0.9, 1.0, 0.3, 0.6, 0.8, 0.5],
            x: this.x,
            name: 'carrots',
            marker: { color: '#FF851B' },
            type: 'bar'
        }],
        layout: {
            title: 'Grouped Bar Plot',
            yaxis: {
                title: 'normalized moisture',
                zeroline: false
            },
            barmode: 'stack'
        }
    };

    public onPlotlyClick(event: Event) {
        console.log('Sim sim sim', event);
    }

}
