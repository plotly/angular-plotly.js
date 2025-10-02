import {Component} from '@angular/core';
import {Config, Data, Layout} from "plotly.js-dist-min";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
    title = 'demo_app';

    public graph: {
        data: Data[];
        layout: Partial<Layout>;
    } = {
        data: [
            {x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+markers', marker: {color: 'red'}},
            {x: [1, 2, 3], y: [2, 5, 3], type: 'bar'},
        ],
        layout: {width: 320, height: 240, title: { text: 'A Fancy Plot'} }
    };
}
