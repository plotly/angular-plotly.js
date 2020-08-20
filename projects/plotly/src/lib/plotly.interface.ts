
/* tslint:disable no-namespace ban-types */
export namespace Plotly {
    export type Data = any;
    export type Layout = any;
    export type Config = any;

    export interface Figure {
        data: Data[];
        layout: Partial<Layout>;
        frames: Partial<Config>;
    }

    export interface PlotlyHTMLElement extends HTMLElement {
        on(event: string, callback: Function): void;
        removeListener(event: string, callback: Function): void;
    }

    export interface PlotlyInstance {
        // tslint:disable max-line-length
        Plots: { resize(div: Plotly.PlotlyHTMLElement): void };
        newPlot(div: HTMLDivElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>): Promise<PlotlyHTMLElement>;
        plot(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>): Promise<PlotlyHTMLElement>;
        react(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>): Promise<PlotlyHTMLElement>;
        // tslint:enable
    }
}
