import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'plotly-box-plot',
    template: `<plotly-plot [data]="data" [layout]="layout" [revision]="0"></plotly-plot>`,
})
export class BoxPlotComponent implements OnInit {

    public data: Plotly.Data[] = [
        { y: [10, 15, 13, 17], type: 'box' },
        { y: [16, 5, 11, 9], type: 'box' },
    ];

    constructor() {

    }

    ngOnInit() {

    }

}
