
export namespace Plotly {
    export type Data = any;
    export type Layout = any;
    export type Config = any;

    /** Base payload emitted by plotly.js events. */
    export interface Event {
        [key: string]: unknown;
    }

    /** A point included in click, hover, and selection event payloads. */
    export interface EventPoint extends Event {
        curveNumber?: number;
        pointNumber?: number | number[];
        pointIndex?: number | number[];
        x?: unknown;
        y?: unknown;
        z?: unknown;
        text?: unknown;
        customdata?: unknown;
        data?: Data;
        fullData?: Data;
    }

    export interface PlotMouseEvent extends Event {
        points: EventPoint[];
        event?: MouseEvent;
    }

    export interface PlotSelectionEvent extends PlotMouseEvent {
        range?: Record<string, unknown>;
        lassoPoints?: { x: number[]; y: number[] };
    }

    export interface PlotRelayoutEvent extends Event {
        event?: Event;
    }

    export type PlotRestyleEvent = [Record<string, unknown>, number[]];

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
        Plots: { resize(div: Plotly.PlotlyHTMLElement): void };
        newPlot(div: HTMLDivElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>): Promise<PlotlyHTMLElement>;
        plot(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>): Promise<PlotlyHTMLElement>;
        react(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>): Promise<PlotlyHTMLElement>;
    }
}
