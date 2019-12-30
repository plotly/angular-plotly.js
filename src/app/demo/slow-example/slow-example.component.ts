import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'plotly-slow-example',
    templateUrl: './slow-example.component.html',
    styleUrls: ['./slow-example.component.scss'],
})
export class SlowExampleComponent implements OnInit {
    data: any;
    layout: any;

    ngOnInit() {
        this.layout = { showlegend: false };
        this.data = this.getData();
    }

    getData() {
        const startValue = 0;
        const stopValue = 100000;
        const pointNum = 10000;
        const traceNum = 10;
        const currValue = startValue;
        const step = (stopValue - startValue) / (pointNum - 1);

        const data = [];

        for (let j = 0; j < traceNum; j++) {
            const X = [];
            const Y = [];
            for (let i = 0; i < pointNum; i++) {
                X.push(currValue + step * i);
                Y.push(this.gaussianRand() * 8 + j * 5);
            }
            data.push({
                type: 'scattergl',
                mode: 'line',
                x: X,
                y: Y
            });
        }

        return data;
    }

    gaussianRand() {
        let rand = 0;
        for (let i = 0; i < 6; i += 1) {
            rand += Math.random();
        }
        return rand / 6 - 0.5;
    }
}
