import { Config, Data, Layout } from 'plotly.js';

export interface Figure {
  data: Data[];
  layout: Partial<Layout>;
  frames: Partial<Config>;
}
