export type Data = any;
export type Layout = any;
export type Config = any;

export interface Figure {
    data: Data[];
    layout: Partial<Layout>;
    frames: Partial<Config>;
}

export interface PlotlyHTMLElement extends HTMLElement {

}
