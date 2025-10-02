import {Config, Data, Layout } from "plotly.js-dist-min";

export interface Figure {
    data: Data[];
    layout: Partial<Layout>;
    frames?: Partial<Config>;
}

export interface PlotlyHTMLElement extends HTMLElement {
    on(event: string, callback: Function): void;
    removeListener(event: string, callback: Function): void;
}
