import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'plotly-timeout-update',
    templateUrl: './timeout-update.component.html',
    styleUrls: ['./timeout-update.component.css']
})
export class TimeoutUpdateComponent implements OnInit, OnDestroy {

    private timestamps: Date[];
    private y1: number[];
    private y2: number[];
    private y3: number[];
    private graph: any;

    private timeoutID: any;

    constructor() { }

    ngOnInit() {
        this.timestamps = [];

        this.y1 = [];
        this.y2 = [];
        this.y3 = [];

        this.graph = {
            data: [
                { x: this.timestamps, y: this.y1, type: 'scatter' },
                { x: this.timestamps, y: this.y2, type: 'scatter' },
                { x: this.timestamps, y: this.y3, type: 'scatter' },
            ],
            layout: {
                autosize: true,
                title: 'Live Plot',
                font: { family: 'Roboto, "Helvetica Neue", sans-serif' },
                margin: { t: 50, b: 20, l: 40, r: 40 },
            }
        };

        this.updateGraph();
    }

    updateGraph() {
        this.timestamps.push(new Date());
        this.y1.push(Math.random());
        this.y2.push(Math.random());
        this.y3.push(Math.random());

        this.graph.data = [
            { x: this.timestamps, y: this.y1, type: 'scatter' },
            { x: this.timestamps, y: this.y2, type: 'scatter' },
            { x: this.timestamps, y: this.y3, type: 'scatter' },
        ];

        this.timeoutID = setTimeout(() => this.updateGraph(), 1000);
    }

    ngOnDestroy(): void {
        clearTimeout(this.timeoutID);
    }
}
