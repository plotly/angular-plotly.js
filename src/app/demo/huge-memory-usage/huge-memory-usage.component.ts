import { Component } from '@angular/core';

@Component({
    selector: 'plotly-huge-memory-usage',
    templateUrl: './huge-memory-usage.component.html',
})
export class HugeMemoryUsageComponent {
    public debug = true;
    public useResizeHandler = true;
    public status = 'init';
    public revision = 0;

    public data: any[] = [];

    public layout = {
        autoexpand: 'true',
        autosie: 'true',
        uirevision: "true",
        margin: {
            autoexpand: true,
            margin: 5
        },
        offset: 100,
        type: "scattergl",
        title: "huge Graph",
        hovermode: "closest",
        xaxis: {
            linecolor: "black",
            linewidth: 2,
            mirror: true,
            title: "Time (s)",
            automargin: true
        },
        yaxis: {
            linecolor: "black",
            linewidth: 2,
            mirror: true,
            automargin: true,
            type: "log",
            exponentformat: "power",
            title: "PSD (g²/Hz)"
        }
    };

    public callback(data: any[]) {
        for (const item of data) {
            this.data.push({
                x: item.f,
                y: item.PSD,
                name: item.name,
                hoverlabel: { namelength: 50 },
                type: "scattergl",
                mode: "line"
            });
        }

        this.status = 'loaded';
        this.revision += 1;
    }

    public loadData() {
        (window as any).callback = this.callback.bind(this);

        const script: HTMLScriptElement = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://d3xt.com/plotly/angular-plotly-huge-memory-usage.json';
        script.onerror = () => {
            this.status = 'failed';
            console.error(`Error loading from angular-plotly-huge-memory-usage.json`);
        };

        const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
        head.appendChild(script);
        this.status = 'loading';
    }

    public changeRandomData() {
        let i = Math.floor((Math.random() * this.data.length) + 1);
        const item = this.data[i];

        i = Math.floor((Math.random() * 2) + 1);
        if (i === 1) {
            const x = item.x;
            i = Math.floor((Math.random() * x.length) + 1);
            x[i] = Math.floor((Math.random() * 50) + 1);
        } else {
            const y = item.y;
            i = Math.floor((Math.random() * y.length) + 1);
            y[i] = Math.floor((Math.random() * 10) + 1);

        }
    }
}
