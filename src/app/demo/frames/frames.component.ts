import { Component, OnInit } from '@angular/core';

import data from './data.json';
import layout from './layout.json';
import frames from './frames.json';


@Component({
    selector: 'plotly-frames',
    templateUrl: './frames.component.html',
})
export class FramesComponent {
    public lookup: any = {};
    public debug = false;
    public useResizeHandler = true;

    public layout = layout;
    public data = data;
    public config = { showSendToCloud: true };
    public frames = frames;

    constructor() { }
}
