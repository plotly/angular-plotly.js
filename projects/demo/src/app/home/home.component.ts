import { Component, OnInit } from '@angular/core';
import { PlotlyService } from 'plotly';


@Component({
    selector: 'demo-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    public graph: any;
    public x: number[] = [1, 2, 3, 4, 5, 6, 7, 9];
    public y: number[] = [1, 2, 3, 4, 5, 6, 7, 9];
    public version = 0;

    constructor(private plotlyService: PlotlyService) {
    }

    ngOnInit() {
        this.graph = {
            data: [
                { x: this.x, y: this.y, type: 'scatter', mode: 'lines+markers' },
            ],
            layout: {
                autosize: true,
                title: 'Live Plot',
                font: { family: 'Roboto, "Helvetica Neue", sans-serif' },
                margin: { t: 50, b: 20, l: 40, r: 40 },
            }
        };

        setTimeout(() => this.startUpdate(), 3000);
    }

    startUpdate() {
        this.x.push(10 + this.version);
        this.y.push(10 + this.version);
        this.version += 1;


        this.graph.data = [
            { x: this.x.slice(), y: this.y.slice(), type: 'scatter', mode: 'lines+markers' }
        ];

        setTimeout(() => this.startUpdate(), 3000);
    }

}
