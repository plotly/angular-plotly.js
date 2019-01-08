import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'plotly-ajax',
    templateUrl: './ajax.component.html'
})
export class AjaxComponent implements OnInit {
    public debug = true;
    public useResizeHandler = true;

    public data: any[];

    public layout: any = {
        title: 'Loading data from ajax',
    };

    constructor() { }

    ngOnInit() {

    }

    public generageRandomIntList(length: number, max: number = 10) {
        const numbers: number[] = [];

        for (let i = 0; i < length; i ++) {
            numbers.push(Math.floor(Math.random() * max));
        }

        return numbers;
    }

    public async loadRandomData() {
        setTimeout(() => {
            const trace1 = {
                x: this.generageRandomIntList(8, 10),
                y: this.generageRandomIntList(8, 20),
                type: 'scatter'
            };

            const trace2 = {
                x: this.generageRandomIntList(8, 10),
                y: this.generageRandomIntList(8, 20),
                type: 'scatter'
            };

            this.data = [trace1, trace2];
        }, 600);
    }

}
