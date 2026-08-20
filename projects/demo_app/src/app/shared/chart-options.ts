import { Plotly } from 'angular-plotly.js';

export const plotStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

export const plotConfig: Partial<Plotly.Config> = {
  responsive: true,
  displaylogo: false,
  scrollZoom: false,
};

export const chartLayout = (overrides: Partial<Plotly.Layout> = {}): Partial<Plotly.Layout> => ({
  autosize: true,
  paper_bgcolor: 'rgba(0, 0, 0, 0)',
  plot_bgcolor: '#ffffff',
  font: {
    color: '#282d33',
    family: 'Open Sans, Arial, sans-serif',
  },
  margin: { t: 36, r: 24, b: 48, l: 52 },
  hoverlabel: {
    bgcolor: '#0c0c0c',
    bordercolor: '#0c0c0c',
    font: { color: '#ffffff' },
  },
  ...overrides,
});
