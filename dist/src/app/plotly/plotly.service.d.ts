export declare namespace Plotly {
    type Data = any;
    type Layout = any;
    type Config = any;
    interface Figure {
        data: Data[];
        layout: Partial<Layout>;
        frames: Partial<Config>;
    }
    interface PlotlyHTMLElement extends HTMLElement {
    }
}
export declare class PlotlyService {
    protected plotly: any;
    constructor();
    newPlot(div: HTMLDivElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>): any;
    plot(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>): any;
    update(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>): any;
    resize(div: Plotly.PlotlyHTMLElement): void;
}
