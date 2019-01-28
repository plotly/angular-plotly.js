import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'plotly-memory-leak',
    templateUrl: './memory-leak.component.html',
    styleUrls: ['./memory-leak.component.css']
})
export class MemoryLeakComponent implements OnInit {
    public debug = true;
    public useResizeHandler = true;

    public num_lines = 4;
    public timespan = 10;
    public t_int = 0.01;
    public update_interval = 0.2;

    public lines = [];
    public t = 0;

    public data: any[] = [
        { x: [1, 2, 3, 4], y: [10, 15, 13, 17], type: 'bar', mode: 'markers', name: 'Bar' },
        { x: [2, 3, 4, 1], y: [16, 5, 11, 9], type: 'scattergl', mode: 'lines', name: 'Lines' },
        { x: [1, 2, 3, 4], y: [12, 9, 15, 12], type: 'markers', mode: 'lines+markers', name: 'Scatter + Lines' },
    ];

    public layout: any = {
        title: 'Adding Names to Line and Scatter Plot',
        width: 480,
        height: 400,
    };

    public ngOnInit() {
        for (let i = 0; i < this.num_lines; ++i) {
            this.lines.push({
                x: [],
                y: [],
                type: 'scatter'
            });

            for (this.t = 0; this.t < this.timespan; this.t += this.t_int) {
                this.lines[i].x.push(this.t);
                this.lines[i].y.push(2 * i + Math.random());
            }
        }

        setInterval(this.tick.bind(this), this.update_interval * 1000);
    }

    public tick() {
        const n = this.update_interval / this.t_int;
        const update = { x: [], y: [] };

        for (let i = 0; i < this.num_lines; ++i) {
            this.lines[i].x = this.lines[i].x.slice(n);
            this.lines[i].y = this.lines[i].y.slice(n);
        }

        const t_init = this.t;
        for (let i = 0; i < this.num_lines; ++i) {
            this.t = t_init;
            for (let j = 0; j < n; ++j, this.t += this.t_int) {
                this.lines[i].x.push(this.t);
                this.lines[i].y.push(2 * i + Math.random());
            }

            update.x.push(this.lines[i].x);
            update.y.push(this.lines[i].y);
        }
    }
}
